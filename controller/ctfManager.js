import Docker from 'dockerode';
const docker = new Docker();

async function getContainerLabel(label, part = false) {
    try {
        const containers = await docker.listContainers({ all: true });
        for (const containerInfo of containers) {
            const container = docker.getContainer(containerInfo.Id);
            const data = await container.inspect();
            if (data.Config.Labels) {
                if (part) {
                    if (data.Config.Labels['label'].startsWith(label)) {
                        return container;
                    }
                } else {
                    if (data.Config.Labels['label'] == label) {
                        return container;
                    }
                }
            }
        }
        return null;
    }
    catch (error) {
        console.error('ERROR: Getting container', error);
        throw error;
    }
}

/**
 * Create a docker container with the specified image.
 * @param {string} imageName - Docker image name.
 * @param {string} userId - User Id.
 * @param {string} flag - Flag to be used in the container.
 * @param {number} memoryLimit - Memory limit (ex. 200 MiB = 200 * 1024 * 1024).
 * @returns {number} - Returns the port assigned to the container.
 */
async function createContainer(imageName, userId, flag = Math.random().toString(36).slice(2, 18), memoryLimit = 200 * 1024 * 1024) {
    const containerName = `${userId}_${imageName}`;
    const labelName = `${process.env.CTF_LABEL}_${containerName}`;
    try {

        var container = await getContainerLabel(labelName);

        if (container) {
            console.log(container.inspect());
            console.log(`The container ${containerName} already exists.`);

        } else {

            container = await docker.createContainer({
                name: labelName,
                Image: imageName,
                ExposedPorts: {
                    '8080/tcp': {}
                },
                HostConfig: {
                    CpuShares: 800,
                    Memory: memoryLimit,
                    PortBindings: {
                        '8080/tcp': [] // Assign port automatically
                    }
                },
                Env: [`FLAG=${flag}`],
                Labels: { "label": labelName }
            });
            await container.start();
            console.log(`Container ${containerName} created successfully.`);
        }

        const containerData = await container.inspect();
        const hostPort = containerData.NetworkSettings.Ports['8080/tcp'][0].HostPort
        console.log(`The container ${containerName} has the port '${hostPort}' assigned.`);
        return hostPort;
    } catch (error) {
        console.error('Error when creating the container:', error);
        throw error;
    }
}

/**
 * Delete all containers with ctf label.
 */
async function deleteAllContainers() {
    const containerPrefix = `${process.env.CTF_LABEL}`;
    return deleteByPrefix(containerPrefix);
}

/**
 * Check if the flag is correct.
 * @param {string} imageName - Docker image name.
 * @param {string} userId - User Id.
 * @param {string} flag - Flag to be checked.
 * @returns {boolean} - Returns true if the flag is correct, false otherwise.
 */
async function checkFlag(imageName, userId, flag) {
    const containerName = `${userId}_${imageName}`;
    const labelName = `${process.env.CTF_LABEL}_${containerName}`;
    try {

        var container = await getContainerLabel(labelName);
        if (container) {
            const data = await container.inspect();
            const containerFlag = data.Config.Env[0].split('=')[1];
            if (containerFlag == flag) {
                return true;
            }
            return false;
        }

    } catch (error) {
        console.error('Error when checking the flag:', error);
        return false;
    }
}


/**
 * Create a docker container with the specified image.
 * @param {string} imageName - Docker image name.
 * @param {string} userId - User Id.

 */
async function deleteContainerByLabel(imageName, userId) {
    console.log('Deleting container');
    const containerName = `${process.env.CTF_LABEL}_${userId}_${imageName}`;
    try {
        const container = await getContainerLabel(containerName);
        if (container == null) {
            console.log(`The container ${containerName} does not exist.`);
        } else {
            await container.kill();
            await container.remove();
            console.log(`Container ${containerName} deleted successfully.`);
            return true;
        }
        return false;
    } catch (error) {
        console.error('ERROR: deleting container', error);
        throw error;
    }
}

/**
 * Create a docker container with the specified image.
 * @param {string} userId - User Id.

 */
async function deleteContainerByUser(userId) {
    const containerPrefix = `${process.env.CTF_LABEL}_${userId}`;
    return deleteByPrefix(containerPrefix);
}

async function deleteByPrefix(containerPrefix) {
    if (containerPrefix) {
        try {
            const containers = await docker.listContainers({ all: true });

            const userContainers = containers.filter(container =>
                container.Names.some(name => name.includes(containerPrefix))
            );

            if (userContainers.length === 0) {
                console.log(`No containers found for prefix: ${containerPrefix}`);
                return true;
            }

            for (const containerInfo of userContainers.reverse()) {
                const container = docker.getContainer(containerInfo.Id);

                await container.kill();
                await container.remove();
                console.log(`Container ${containerInfo.Names[0]} deleted successfully.`);
            }
            return true;

        } catch (error) {
            console.error('Error deleting containers:', error);
            throw error;
        }

    }
}

export { createContainer, deleteContainerByUser, deleteContainerByLabel, checkFlag, deleteAllContainers };