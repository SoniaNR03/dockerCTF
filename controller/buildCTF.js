const Docker = require('dockerode');
const docker = new Docker();

docker.buildImage({
    context: './ctfs/01-introduction',
    src: ['.']
}, { t: "ctf-01" }, (err, stream) => {
    if (err) {
        console.error(err);
        return;
    }
    stream.pipe(process.stdout);
    stream.on('end', () => {
        console.log('Build completed');
    });
});




// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//     JOSE MIGUEL MORENO LOPEZ
// 17: 10
// https://expressjs.com/
// JOSE MIGUEL MORENO LOPEZ
// 17: 16
// const stream = await docker.buildImage({
//     context: basePath,
//     src: ['.']
// }, {
//     t: imageName
// })
// JOSE MIGUEL MORENO LOPEZ
// 17: 18
// const container = await docker.createContainer({
//     name: `${lab.id}_${userId}_${~~(Date.now() / 1000)}`,
//     Image: lab.image,
//     ExposedPorts: {
//         '8080/tcp': {}
//     },
//     HostConfig: {
//         CpuShares: 800, // Less than default value of 1024
//         Memory: 1024 * 1024 * 200, // 200 MiB
//         PortBindings: {
//             '8080/tcp': [{ HostPort: '' }]
//         }
//     },
//     Env: [