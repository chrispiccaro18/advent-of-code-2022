const mkDir = (directoryName, parent, children, files) => {
    return {
        name: directoryName,
        parent,
        children,
        files
    };
};

const mkFile = (fileName, parent, size) => {
    return {
        name: fileName,
        parent,
        size,
    };
};

const day07part01 = input => {
    const rawTerminalOutputArray = input.split('\n');
    const firstCharPerLine = rawTerminalOutputArray.map(line => {
        return line[0];
    });

    const initialDirectoryTree = {
        '/': {
            name: '/',
            children: [],
            files: [],
            
        },
        files: [],
    };

    let presentWorkingDirectory = {
        name: '',
        parent: null,
        children: null,
        files: null,
    };

    const completeDirTree = rawTerminalOutputArray.reduce((workingDirTree, terminalLine, index, originalArray) => {
        // check for command
        if(terminalLine[0] === '$') {
            const [_, commandType, ...dirToMoveToArray] = terminalLine.split(' ');
            // check for cd
            if(commandType === 'cd') {
                const dirToMoveTo = dirToMoveToArray[0];
                // console.log(dirToMoveTo)
                // back out one directory
                if(dirToMoveTo === '..') {
                    if(presentWorkingDirectory.parent === '/' || presentWorkingDirectory.name === '/') presentWorkingDirectory = workingDirTree['/'];
                    else presentWorkingDirectory = workingDirTree[presentWorkingDirectory.parent];
                }
                // to root
                else if(dirToMoveTo === '/') {
                    presentWorkingDirectory = workingDirTree['/'];
                }
                // cd can either move one level in to a named directory
                else {
                    if(!workingDirTree[dirToMoveTo]) {
                        const newDir = mkDir(dirToMoveTo, presentWorkingDirectory.name, [], []);
                        workingDirTree[dirToMoveTo] = newDir;
                    }
                    presentWorkingDirectory = workingDirTree[dirToMoveTo];
                }
            }
            // otherwise it's an ls
            else {
                // determine the output of ls
                // find next instance of a command
                const nextCommandIndex = parseInt(firstCharPerLine.indexOf('$', index + 1));
                let lsOutput = null;
                // create subArray of the ls output
                if(nextCommandIndex > 0) {
                    lsOutput = originalArray.slice(index + 1, nextCommandIndex);
                } else {
                    lsOutput = originalArray.slice(index + 1);
                }

                
                // add children and files to pwd in tree
                lsOutput.forEach(output => {
                    const [first, name] = output.split(' ');
                    // dir, add to children and tree
                    if(!parseInt(first)) {
                        if(!workingDirTree[presentWorkingDirectory.name].children.includes(name)) {
                            workingDirTree[presentWorkingDirectory.name].children.push(name);
                        }
                        if(!workingDirTree[name]) {
                            const newDir = mkDir(name, presentWorkingDirectory.name, [], []);
                            workingDirTree[name] = newDir;
                        }
                    }
                    // file, add to children and tree
                    else {
                        if(!workingDirTree[presentWorkingDirectory.name].files.includes(name)) {
                            workingDirTree[presentWorkingDirectory.name].files.push(name);
                        }
                        if(!workingDirTree.files[name]) {
                            const newFile = mkFile(name, presentWorkingDirectory.name, parseInt(first));
                            workingDirTree.files[name] = newFile;
                        }
                    }   
                });
            }
        }

        return workingDirTree;
    }, initialDirectoryTree);
    console.log(completeDirTree);

    return completeDirTree;
};

module.exports = {
    day07part01,
};
