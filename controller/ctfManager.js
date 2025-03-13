import Docker from 'dockerode';
const docker = new Docker();




async function getContainerLabel(label, part = false) {
    try {
        const containers = await docker.listContainers({ all: true }); //TODO: CHECK LIST CONTAINERS
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
async function createContainer(imageName, userId, flag, memoryLimit = 200 * 1024 * 1024) {
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
    // TODO: IN PROCESS
    console.log('Deleting all containers');
    try {
        const container = await getContainerLabel(process.env.CTF_LABEL, true);
        if (container == null) {
            console.log(`The container ${containerName} does not exist.`);
        } else {
            await container.stop();
            await container.remove();
            console.log(`Container ${containerName} deleted successfully.`);
        }
    } catch (error) {
        console.error('ERROR: deleting container', error);
        throw error;
    }
}

/**
 * Create a docker container with the specified image.
 * @param {string} userId - User Id.
 */
async function deleteUserContainers(userId) {
    // TODO: IN PROCESS

    console.log('Deleting container');
    const label = `${process.env.CTF_LABEL}_${userId}`;
    try {
        const container = await getContainerLabel(label, true);
        if (container == null) {
            console.log(`The container ${containerName} does not exist.`);
        } else {
            await container.stop();
            await container.remove();
            console.log(`Container ${containerName} deleted successfully.`);
        }
    } catch (error) {
        console.error('ERROR: deleting container', error);
        throw error;
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
            await container.stop();
            await container.remove();
            console.log(`Container ${containerName} deleted successfully.`);
        }
    } catch (error) {
        console.error('ERROR: deleting container', error);
        throw error;
    }
}

/**
 * Create a docker container with the specified image.
 * @param {string} imageName - Docker image name.
 * @param {string} userId - User Id.

 */
async function deleteContainerByName(imageName, userId) {
    console.log('Deleting container');
    const containerName = `${userId}_${imageName}`;
    try {
        const container = await docker.getContainer(containerName);
        if (container == null) {
            console.log(`The container ${containerName} does not exist.`);
        } else {
            await container.stop();
            await container.remove();
            console.log(`Container ${containerName} deleted successfully.`);
        }
    } catch (error) {
        console.error('ERROR: deleting container', error);
        throw error;
    }
}

export { createContainer, deleteContainerByName, deleteContainerByLabel, deleteAllContainers, deleteUserContainers };