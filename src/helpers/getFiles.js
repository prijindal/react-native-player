import RNFS from 'react-native-fs';
import MediaMetadataRetriever from '../components/MediaMetadataRetriever';

const checkMusic = (fileInfo) => {
  const splited = fileInfo.path.split('.');
  if (splited.length <= 1) {
    return false;
  }
  const extension = splited[1].toLowerCase();
  if (extension === 'mp3') {
    return true;
  }
  return false;
};

const recursiveFilesGetter = async (fileInfo, files = []) => {
  if (fileInfo.isFile() && checkMusic(fileInfo)) {
    let metadata;
    try {
      metadata = await MediaMetadataRetriever.retrieveMedia(fileInfo.path);
    } catch (e) {
      metadata = {
        title: fileInfo.name,
      };
    }
    console.log(metadata.title);
    return [
      ...files,
      {
        ...metadata,
        name: fileInfo.name,
        path: fileInfo.path,
      },
    ];
  } else if (fileInfo.isDirectory()) {
    try {
      const child = await RNFS.readDir(fileInfo.path);
      let childFiles = [];
      for (let i = 0; i < child.length; i += 1) {
        childFiles = [
          ...childFiles,
          ...await recursiveFilesGetter(child[i], files),
        ];
      }
      return childFiles;
    } catch (e) {
      return files;
    }
  }
  return files;
};

const getFiles = async () => {
  const dirInfo = {
    isFile: () => false,
    isDirectory: () => true,
    path: '/storage',
  };
  const files = await recursiveFilesGetter(dirInfo);
  return files;
};

export default getFiles;
