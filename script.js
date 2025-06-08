new Vue({
    el: '#app',
    data: {
        terminalOutput: 'Welcome to Hacker OS\nType a command to begin...\n',
        command: ''
    },
    methods: {
        executeCommand() {
            if (this.command.trim() === '') return;

            this.terminalOutput += `> ${this.command}\n`;
            this.scrollToBottom();

            // Simulate command execution
            if (this.command === 'help') {
                this.terminalOutput += 'Available commands:\nhelp - Show this help\nclear - Clear the terminal\nexit - Close Hacker OS\nattack xxxx - Simulate an attack on an IP or domain\nhackrepo xxxx - Simulate hacking and display a directory tree\ndirecthacking - Simulate typing code like hackertyper.com\n';
            } else if (this.command === 'clear') {
                this.terminalOutput = '';
            } else if (this.command === 'exit') {
                this.terminalOutput += 'Exiting Hacker OS...\n';
            } else if (this.command.startsWith('attack')) {
                const target = this.command.split(' ')[1];
                if (this.validateTarget(target)) {
                    this.terminalOutput += `Loading target ${target}...\n`;
                    this.simulateAttack();
                } else {
                    this.terminalOutput += `Invalid target: ${target}\nPlease enter a valid IP address or domain.\n`;
                }
            } else if (this.command.startsWith('hackrepo')) {
                const target = this.command.split(' ')[1];
                if (this.validateTarget(target)) {
                    this.simulateHackRepo(target);
                } else {
                    this.terminalOutput += `Invalid target: ${target}\nPlease enter a valid IP address or domain.\n`;
                }
            } else if (this.command.startsWith('directhacking')) {
                this.simulateDirectHacking();
            } else {
                this.terminalOutput += `Unknown command: ${this.command}\n`;
            }

            this.command = '';
        },
        simulateAttack() {
            const hexSymbols = '0123456789ABCDEF';
            const generateHexBlock = () => {
                let block = '';
                for (let i = 0; i < 50; i++) {
                    block += hexSymbols[Math.floor(Math.random() * hexSymbols.length)];
                }
                return block;
            };

            const appendHexBlock = () => {
                this.terminalOutput += `${generateHexBlock()}\n`;
                this.scrollToBottom();
                setTimeout(appendHexBlock, 300);
            };

            appendHexBlock();
        },
        simulateHackRepo(target) {
            const osVersions = ['Windows 10', 'Windows 11', 'macOS Monterey', 'macOS Ventura', 'Linux Ubuntu 20.04', 'Linux Fedora 36'];
            const vulnerabilities = ['Buffer Overflow', 'SQL Injection', 'Cross-Site Scripting', 'Privilege Escalation', 'Remote Code Execution'];
            const retries = Math.floor(Math.random() * 4);

            const directoryTree = [];
            const directories = ['bin', 'etc', 'home', 'var', 'usr', 'opt', 'lib', 'tmp', 'dev', 'sys', 'boot', 'proc', 'run', 'srv', 'media', 'mnt', 'share', 'tools', 'apps'];
            const subdirs = ['config', 'logs', 'data', 'backup', 'scripts', 'cache', 'temp', 'keys', 'secrets', 'modules', 'plugins', 'assets', 'resources', 'tests', 'examples'];
            const files = ['config.sys', 'kernel.img', 'bootloader.bin', 'passwd', 'shadow', 'readme.md', 'setup.exe', 'data.db', 'logfile.log', 'error.log', 'backup.tar.gz', 'image.png', 'video.mp4', 'script.sh', 'main.py', 'index.html', 'style.css', 'script.js', 'notes.txt', 'report.pdf', 'debug.log', 'output.txt', 'input.csv', 'metadata.json', 'archive.zip', 'snapshot.img', 'binary.dat', 'source.cpp', 'header.h', 'manifest.xml'];

            directories.forEach(dirName => {
                directoryTree.push(`root/${dirName}/`);
                files.forEach(fileName => {
                    directoryTree.push(`root/${dirName}/${fileName}`);
                });
                subdirs.forEach(subdirName => {
                    directoryTree.push(`root/${dirName}/${subdirName}/`);
                    files.slice(0, 15).forEach(fileName => {
                        directoryTree.push(`root/${dirName}/${subdirName}/${fileName}`);
                    });
                    subdirs.slice(0, 5).forEach(deeperSubdir => {
                        directoryTree.push(`root/${dirName}/${subdirName}/${deeperSubdir}/`);
                        files.slice(0, 10).forEach(fileName => {
                            directoryTree.push(`root/${dirName}/${subdirName}/${deeperSubdir}/${fileName}`);
                        });
                    });
                });
            });

            const simulateSteps = async () => {
                this.terminalOutput += `Loading domain/IP address ${target}...\n`;
                await this.delay(1000);
                this.terminalOutput += `Detected OS: ${osVersions[Math.floor(Math.random() * osVersions.length)]}\n`;
                await this.delay(1000);
                this.terminalOutput += `Found vulnerability: ${vulnerabilities[Math.floor(Math.random() * vulnerabilities.length)]}\n`;
                await this.delay(1000);
                for (let i = 0; i < retries; i++) {
                    this.terminalOutput += `Could not get in (retry ${i + 1})...\n`;
                    await this.delay(1000);
                }
                this.terminalOutput += 'Hacked! Downloading directory tree...\n';
                await this.delay(1000);

                directoryTree.forEach((line, index) => {
                    setTimeout(() => {
                        this.terminalOutput += `${line}\n`;
                        this.scrollToBottom();
                    }, index * 20);
                });
            };

            simulateSteps();
        },
        simulateDirectHacking() {
            const codeSnippets = [
                'function hackSystem() {',
                '    console.log("Hacking in progress...");',
                '    let accessGranted = false;',
                '    for (let i = 0; i < 1000; i++) {',
                '        if (Math.random() > 0.99) {',
                '            accessGranted = true;',
                '            break;',
                '        }',
                '    }',
                '    return accessGranted;',
                '}',
                'const result = hackSystem();',
                'if (result) {',
                '    console.log("Access granted!");',
                '} else {',
                '    console.log("Access denied.");',
                '}'
            ];

            let index = 0;
            const typeCode = (key) => {
                if (index < codeSnippets.length) {
                    this.terminalOutput += `${codeSnippets[index]}\n`;
                    this.scrollToBottom();
                    index++;
                } else {
                    this.terminalOutput += `${key}`;
                    this.scrollToBottom();
                }
            };

            document.addEventListener('keydown', (event) => {
                typeCode(event.key);
            });
        },
        delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
        validateTarget(target) {
            // Validate IP address
            const ipRegex = /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/;
            // Validate domain
            const domainRegex = /^(?!-)[A-Za-z0-9-]{1,63}(?<!-)\.[A-Za-z]{2,6}$/;

            return ipRegex.test(target) || domainRegex.test(target);
        },
        scrollToBottom() {
            this.$nextTick(() => {
                const terminal = this.$el.querySelector('.terminal');
                terminal.scrollTop = terminal.scrollHeight;
            });
        }
    }
});
