const ROOT = '/';

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

const calculateFilesInDir = (dir, allFiles) => {
    const currentDirFiles = dir.files;
    return currentDirFiles.reduce((totalSize, fileName) => {
        return totalSize + allFiles[fileName].size;
    }, 0);
};

const calculateDirSize = (dir, dirTree) => {
    if(!dir.children.length) {
        const dirSize = calculateFilesInDir(dir, dirTree.files);
        dirTree[dir.name].size = dirSize;
        return dirSize;
    } else {
        const sizeOfChildren = dir.children.reduce((count, childName) => {
            return count + calculateDirSize(dirTree[childName], dirTree);
        }, 0);
        const dirSize = calculateFilesInDir(dir, dirTree.files) + sizeOfChildren;
        dirTree[dir.name].size = dirSize;
        return dirSize;
    }
};

const day07part01 = input => {
    const rawTerminalOutputArray = input.split('\n');
    const firstCharPerLine = rawTerminalOutputArray.map(line => {
        return line[0];
    });

    const initialDirectoryTree = {
        [ROOT]: {
            name: ROOT,
            children: [],
            files: [],
            
        },
        files: {},
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
                // back out one directory
                if(dirToMoveTo === '..') {
                    if(presentWorkingDirectory.parent === ROOT || presentWorkingDirectory.name === ROOT) presentWorkingDirectory = workingDirTree[ROOT];
                    else presentWorkingDirectory = workingDirTree[presentWorkingDirectory.parent];
                }
                // to root
                else if(dirToMoveTo === ROOT) {
                    presentWorkingDirectory = workingDirTree[ROOT];
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

    // first calculate size of dirs with no children, then their parents until root

    
    // const nonRecursiveSizeOfDirs = dirNames.reduce((sizes, dirName) => {
    //     const { files: currentDirFiles } = completeDirTree[dirName];
    //     const nonRecursiveSize = currentDirFiles.reduce((totalSize, fileName) => {
    //         return totalSize + justFiles[fileName].size;
    //     }, 0);
    //     return [...sizes, { dirName, size: nonRecursiveSize }];
    // }, []);

    // const recursiveSizeOfDirs = nonRecursiveSizeOfDirs.map(dir => {
    //     const { dirName, size: nonRecursiveSize } = dir;
    //     const childrenOfCurrentDir = completeDirTree[dirName].children;
    //     if(!childrenOfCurrentDir.length) return dir;
    //     if(childrenOfCurrentDir.length) {
    //         const recursiveSize = childrenOfCurrentDir.reduce((size, child) => {
    //             const sizeOfChild = nonRecursiveSizeOfDirs.find(dir => dir.dirName === child).size;
    //             return size + sizeOfChild;
    //         }, nonRecursiveSize);
    //         return {
    //             dirName,
    //             size: recursiveSize,
    //         };
    //     }
    // });

    // const result = recursiveSizeOfDirs.reduce((total, dir) => {
    //     const { size } = dir;
    //     if(size > 100000) return total;
    //     return total + size;
    // }, 0);
    calculateDirSize(completeDirTree[ROOT], completeDirTree);
    // eslint-disable-next-line no-unused-vars
    const { files, ...dirs } = completeDirTree;
    return Object.values(dirs).filter(dir => dir.size <= 100000).reduce((count, dir) => {
        return count + dir.size;
    }, 0);
};

module.exports = {
    calculateFilesInDir,
    calculateDirSize,
    day07part01,
};
