const ROOT = '/';
const TDS = 70000000;
const SFU = 30000000;

const mkDir = (directoryName, path, children, files) => ({
    name: directoryName,
    path,
    children,
    files,
});

const mkFile = (fileName, path, size) => ({
    name: fileName,
    path,
    size,
});

const changePath = (path, direction) => {
    if(direction === '..') {
        const pathArray = path.split(ROOT);
        pathArray.shift();

        if(pathArray.length <= 1) return ROOT;
        pathArray.pop();
        const newPath = pathArray.reduce((newPath, dir) => newPath + ROOT + dir, '');
        return newPath;
    } else return path + (path === ROOT ? '' : ROOT) + direction;
};

const mkDirTree = terminalOutputString => {
    const rawTerminalOutputArray = terminalOutputString.split('\n');
    const firstCharPerLine = rawTerminalOutputArray.map(line => line[0]);

    const initialDirectoryTree = {
        [ROOT]: {
            name: ROOT,
            path: ROOT,
            children: [],
            files: [],
        },
    };

    let presentWorkingDirectory = '/';

    return rawTerminalOutputArray.reduce((workingDirTree, terminalLine, index, originalArray) => {
        // check for command
        if(firstCharPerLine[index] === '$') {
            const [_, commandType, ...dirToMoveToArray] = terminalLine.split(' ');
            // check for cd
            if(commandType === 'cd') {
                const dirToMoveTo = dirToMoveToArray[0];
                // back out one directory
                if(dirToMoveTo === '..') 
                    presentWorkingDirectory = changePath(presentWorkingDirectory, dirToMoveTo);
                // to root
                else if(dirToMoveTo === ROOT)
                    presentWorkingDirectory = ROOT;
                // cd can either move one level in to a named directory
                else {
                    const newPath = changePath(presentWorkingDirectory, dirToMoveTo);
                    if(!workingDirTree[newPath]) {
                        const newDir = mkDir(dirToMoveTo, newPath, [], []);
                        workingDirTree[newPath] = newDir;
                    }
                    presentWorkingDirectory = newPath;
                }
            }
            // otherwise it's an ls
            else {
                // determine the output of ls
                // find next instance of a command
                const nextCommandIndex = parseInt(firstCharPerLine.indexOf('$', index + 1));
                // create subArray of the ls output
                let lsOutput = null;
                if(nextCommandIndex > 0)
                    lsOutput = originalArray.slice(index + 1, nextCommandIndex);
                else
                    lsOutput = originalArray.slice(index + 1);

                // add children and files to pwd in tree
                lsOutput.forEach(output => {
                    const [first, name] = output.split(' ');
                    // dir, add to children and tree
                    if(!parseInt(first)) {
                        const newDirPath = changePath(presentWorkingDirectory, name);
                        if(!workingDirTree[presentWorkingDirectory].children.includes(newDirPath)) {
                            workingDirTree[presentWorkingDirectory].children.push(newDirPath);
                        }
                        if(!workingDirTree[newDirPath]) {
                            const newDir = mkDir(name, newDirPath, [], []);
                            workingDirTree[newDirPath] = newDir;
                        }
                    }
                    // file, add to children and tree
                    else {
                        if(!workingDirTree[presentWorkingDirectory].files.filter(file => file.name === name).length) {
                            workingDirTree[presentWorkingDirectory].files.push(mkFile(name, presentWorkingDirectory, parseInt(first)));
                        }
                    }   
                });
            }
        }
        return workingDirTree;
    }, initialDirectoryTree);
};

const calculateFilesInDir = dir => {
    const totalFilesSizeInDir = dir.files.reduce((totalSize, file) => totalSize + file.size, 0);
    dir.size = totalFilesSizeInDir;
    return totalFilesSizeInDir;
};

const calculateDirSize = (dir, dirTree) => {
    if(!dir.children.length)
        return calculateFilesInDir(dir);
    else {
        const sizeOfChildren = dir.children.reduce((count, childPath) => 
            count + calculateDirSize(dirTree[childPath], dirTree), 0);

        const dirSize = calculateFilesInDir(dir) + sizeOfChildren;
        dir.size = dirSize;
        return dirSize;
    }
};

const day07part01 = input => {
    const completeDirTree = mkDirTree(input);
    calculateDirSize(completeDirTree[ROOT], completeDirTree);

    return Object.values(completeDirTree)
        .filter(dir => dir.size <= 100000)
        .reduce((count, dir) => count + dir.size, 0);
};

// Find the smallest directory that, if deleted,
// would free up enough space on the filesystem to run the update.
// What is the total size of that directory?
// Total Disk Space (tds) = 70000000
// Space for Update (sfu) = 30000000
// Root will tell us how much we are using, 48381165
// Freespace is tds - root, 21618835
// Minimum size of Directory to Delete = sfu - freespace, 8381165
const day07part02 = input => {
    const completeDirTree = mkDirTree(input);
    calculateDirSize(completeDirTree[ROOT], completeDirTree);

    const freespace = TDS - completeDirTree[ROOT].size;
    const minSizeToDelete = SFU - freespace;

    return Object.values(completeDirTree)
        .filter(dir => dir.size >= minSizeToDelete)
        .sort((a, b) => a.size - b.size)[0].size;
};

module.exports = {
    changePath,
    mkDirTree,
    calculateFilesInDir,
    calculateDirSize,
    day07part01,
    day07part02,
};
