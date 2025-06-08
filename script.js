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
                this.terminalOutput += 'Available commands:\nhelp - Show this help\nclear - Clear the terminal\nexit - Close Hacker OS\nattack xxxx - Simulate an attack on an IP or domain\nhackrepo xxxx - Simulate hacking and display a directory tree\n';
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

            const directoryTree = [
                'root/',
                'root/bin/',
                'root/bin/bash',
                'root/bin/ls',
                'root/etc/',
                'root/etc/passwd',
                'root/etc/shadow',
                'root/home/',
                'root/home/user/',
                'root/home/user/documents/',
                'root/home/user/documents/file1.txt',
                'root/home/user/documents/file2.txt',
                'root/home/user/documents/file3.txt',
                'root/home/user/documents/file4.txt',
                'root/home/user/pictures/',
                'root/home/user/pictures/image1.jpg',
                'root/home/user/pictures/image2.png',
                'root/home/user/pictures/image3.gif',
                'root/home/user/videos/',
                'root/home/user/videos/video1.mp4',
                'root/home/user/videos/video2.avi',
                'root/home/user/videos/video3.mkv',
                'root/home/user/music/',
                'root/home/user/music/song1.mp3',
                'root/home/user/music/song2.wav',
                'root/home/user/music/song3.flac',
                'root/home/user/projects/',
                'root/home/user/projects/project1/',
                'root/home/user/projects/project1/code.js',
                'root/home/user/projects/project1/readme.md',
                'root/home/user/projects/project2/',
                'root/home/user/projects/project2/main.py',
                'root/home/user/projects/project2/requirements.txt',
                'root/home/user/projects/project3/',
                'root/home/user/projects/project3/index.html',
                'root/home/user/projects/project3/style.css',
                'root/home/user/projects/project3/script.js',
                'root/home/user/downloads/',
                'root/home/user/downloads/file1.zip',
                'root/home/user/downloads/file2.rar',
                'root/home/user/downloads/file3.tar.gz',
                'root/home/user/downloads/file4.iso',
                'root/home/user/temp/',
                'root/home/user/temp/tempfile1.tmp',
                'root/home/user/temp/tempfile2.tmp',
                'root/home/user/temp/tempfile3.tmp',
                'root/home/user/temp/tempfile4.tmp',
                'root/home/user/temp/tempfile5.tmp'
            ];

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
                    }, index * 100);
                });
            };

            simulateSteps();
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
