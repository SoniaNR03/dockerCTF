import fs from 'fs';
import path from 'path';
import Docker from 'dockerode';

const docker = new Docker();

const ctf_folder = './ctfs';
const list_folders = folder_list(ctf_folder);
var frontend_config = {};

for (const [index, folder] of list_folders.entries()) {
    // For each folder in the ctf_folder we generate an image 
    const folder_path = path.join(ctf_folder, folder);
    const files = folder_list(folder_path);

    // Config.json file check
    if (files.includes('config.json')) {
        const config_path = path.join(folder_path, 'config.json');
        const config_json = JSON.parse(fs.readFileSync(config_path, 'utf8'));
        frontend_config[index] = config_json;
        // Build image
        console.log(`\n----- CTF_${index} '${config_json.name}' -----`);
        console.log(`==>Building ${config_json.id} image`);
        // Availability
        if (config_json.available) {
            buildImage(config_json.id, folder_path);
        } else {
            console.log(`==>CTF not available\n`);
        }

    } else {
        console.log(`\n----- CTF_${index} -----`);
        console.log(`==>ERROR: Missing ctf configuration in ${folder_path}\n`);
    }
}

const frontendConfigJSON = JSON.stringify(frontend_config, null, 4);
const frontendConfigPath = './frontend_config.json';

try {
    fs.writeFileSync(frontendConfigPath, frontendConfigJSON);
    console.log(`\n==> Frontend_config saved to ${frontendConfigPath}`);
} catch (error) {
    console.error(`\n==> ERROR: Failed to save frontend_config.json:`, error);
}


function folder_list(folder) {
    try {
        const files = fs.readdirSync(folder);
        return files;
    } catch (error) {
        console.error(error);
        return [];
    }
}

function buildImage(imageName, basePath) {
    docker.buildImage({
        context: basePath,
        src: ['.']
    }, {
        t: imageName
    }, (err, stream) => {
        if (err) {
            console.error(`ERROR building image ${imageName}: ${err}`);
            return;
        }
        stream.pipe(process.stdout);
        stream.on('end', () => {
            console.log(`==>Image ${imageName} built successfully\n`);
        });
    });
}
