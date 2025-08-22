'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaFolder, 
  FaFile, 
  FaDownload, 
  FaTrash, 
  FaEye, 
  FaUpload,
  FaFileImage,
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFileCode,
  FaFileArchive,
  FaPlus,
  FaSearch
} from 'react-icons/fa';

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size: number;
  uploadDate: string;
  mimeType: string;
  url?: string;
  description?: string;
}

const FilesSection = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'documents' | 'images' | 'code' | 'others'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    // Load files from localStorage (temporary - will be replaced with Supabase)
    const savedFiles = localStorage.getItem('userFiles');
    if (savedFiles) {
      setFiles(JSON.parse(savedFiles));
    } else {
      // Demo files
      const demoFiles: FileItem[] = [
        {
          id: '1',
          name: 'Project Proposal.pdf',
          type: 'file',
          size: 2048000,
          uploadDate: '2025-08-20',
          mimeType: 'application/pdf',
          description: 'Project proposal document for Q4 initiatives'
        },
        {
          id: '2',
          name: 'Team Photo.jpg',
          type: 'file',
          size: 1024000,
          uploadDate: '2025-08-19',
          mimeType: 'image/jpeg',
          description: 'Official team photo from last meetup'
        },
        {
          id: '3',
          name: 'Code Samples',
          type: 'folder',
          size: 0,
          uploadDate: '2025-08-18',
          mimeType: 'folder',
          description: 'Collection of code samples and snippets'
        },
        {
          id: '4',
          name: 'main.js',
          type: 'file',
          size: 15360,
          uploadDate: '2025-08-17',
          mimeType: 'application/javascript',
          description: 'Main JavaScript file for the project'
        },
        {
          id: '5',
          name: 'Documentation.docx',
          type: 'file',
          size: 512000,
          uploadDate: '2025-08-16',
          mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          description: 'Technical documentation and guidelines'
        }
      ];
      setFiles(demoFiles);
      localStorage.setItem('userFiles', JSON.stringify(demoFiles));
    }
  }, []);

  const getFileIcon = (mimeType: string, type: string) => {
    if (type === 'folder') return FaFolder;
    
    if (mimeType.startsWith('image/')) return FaFileImage;
    if (mimeType === 'application/pdf') return FaFilePdf;
    if (mimeType.includes('word') || mimeType.includes('document')) return FaFileWord;
    if (mimeType.includes('sheet') || mimeType.includes('excel')) return FaFileExcel;
    if (mimeType.includes('javascript') || mimeType.includes('code') || mimeType.includes('text/')) return FaFileCode;
    if (mimeType.includes('zip') || mimeType.includes('archive')) return FaFileArchive;
    
    return FaFile;
  };

  const getFileCategory = (mimeType: string, type: string): string => {
    if (type === 'folder') return 'others';
    if (mimeType.startsWith('image/')) return 'images';
    if (mimeType.includes('pdf') || mimeType.includes('word') || mimeType.includes('document')) return 'documents';
    if (mimeType.includes('javascript') || mimeType.includes('code') || mimeType.includes('text/')) return 'code';
    return 'others';
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileTypeColor = (mimeType: string, type: string): string => {
    if (type === 'folder') return 'text-yellow-400 bg-yellow-600/20';
    if (mimeType.startsWith('image/')) return 'text-green-400 bg-green-600/20';
    if (mimeType.includes('pdf')) return 'text-red-400 bg-red-600/20';
    if (mimeType.includes('word')) return 'text-blue-400 bg-blue-600/20';
    if (mimeType.includes('code') || mimeType.includes('javascript')) return 'text-purple-400 bg-purple-600/20';
    return 'text-gray-400 bg-gray-600/20';
  };

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (file.description && file.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || getFileCategory(file.mimeType, file.type) === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    if (uploadedFiles) {
      const newFiles: FileItem[] = Array.from(uploadedFiles).map((file, index) => ({
        id: Date.now().toString() + index,
        name: file.name,
        type: 'file' as const,
        size: file.size,
        uploadDate: new Date().toISOString().split('T')[0],
        mimeType: file.type,
        description: `Uploaded on ${new Date().toLocaleDateString()}`
      }));
      
      const updatedFiles = [...files, ...newFiles];
      setFiles(updatedFiles);
      localStorage.setItem('userFiles', JSON.stringify(updatedFiles));
    }
  };

  const deleteFile = (fileId: string) => {
    const updatedFiles = files.filter(file => file.id !== fileId);
    setFiles(updatedFiles);
    localStorage.setItem('userFiles', JSON.stringify(updatedFiles));
  };

  const categories = [
    { key: 'all', label: 'All Files', count: files.length },
    { key: 'documents', label: 'Documents', count: files.filter(f => getFileCategory(f.mimeType, f.type) === 'documents').length },
    { key: 'images', label: 'Images', count: files.filter(f => getFileCategory(f.mimeType, f.type) === 'images').length },
    { key: 'code', label: 'Code', count: files.filter(f => getFileCategory(f.mimeType, f.type) === 'code').length },
    { key: 'others', label: 'Others', count: files.filter(f => getFileCategory(f.mimeType, f.type) === 'others').length }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">My Files</h1>
          <p className="text-white/70">Manage your documents and files</p>
        </div>
        
        <div className="flex gap-3">
          <label className="cursor-pointer">
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              accept="*/*"
            />
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <FaUpload />
              Upload Files
            </motion.div>
          </label>
        </div>
      </div>

      {/* Stats and Search */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Categories */}
        <div className="lg:col-span-1">
          <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-red-500/20">
            <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <motion.button
                  key={category.key}
                  onClick={() => setSelectedCategory(category.key as any)}
                  whileHover={{ scale: 1.02 }}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                    selectedCategory === category.key
                      ? 'bg-red-600/20 border border-red-500/30 text-red-400'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>{category.label}</span>
                  <span className="text-sm bg-white/10 px-2 py-1 rounded-full">
                    {category.count}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Search and Storage Info */}
        <div className="lg:col-span-2 space-y-4">
          {/* Search */}
          <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-red-500/20">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search files by name or description..."
                className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          {/* Storage Info */}
          <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-red-500/20">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-white">Storage Usage</h3>
              <span className="text-white/70">
                {formatFileSize(files.reduce((total, file) => total + file.size, 0))} used
              </span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-red-600 to-red-400 h-2 rounded-full transition-all duration-300"
                style={{ width: '35%' }}
              ></div>
            </div>
            <p className="text-white/50 text-sm mt-2">35% of 1GB used</p>
          </div>
        </div>
      </div>

      {/* Files Grid */}
      <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-red-500/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">
            {selectedCategory === 'all' ? 'All Files' : categories.find(c => c.key === selectedCategory)?.label}
            <span className="text-white/50 ml-2">({filteredFiles.length})</span>
          </h3>
          
          <div className="flex gap-2">
            <motion.button
              onClick={() => setViewMode('grid')}
              whileHover={{ scale: 1.05 }}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-red-600 text-white' : 'bg-white/10 text-white/70'}`}
            >
              <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
              </div>
            </motion.button>
            <motion.button
              onClick={() => setViewMode('list')}
              whileHover={{ scale: 1.05 }}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-red-600 text-white' : 'bg-white/10 text-white/70'}`}
            >
              <div className="w-4 h-4 flex flex-col gap-1">
                <div className="bg-current h-0.5 rounded"></div>
                <div className="bg-current h-0.5 rounded"></div>
                <div className="bg-current h-0.5 rounded"></div>
              </div>
            </motion.button>
          </div>
        </div>

        {filteredFiles.length === 0 ? (
          <div className="text-center py-12">
            <FaFolder className="text-4xl text-white/30 mx-auto mb-4" />
            <p className="text-white/50">No files found.</p>
            {searchTerm && (
              <p className="text-white/30 text-sm mt-2">Try adjusting your search terms</p>
            )}
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4' : 'space-y-2'}>
            <AnimatePresence>
              {filteredFiles.map((file) => {
                const FileIcon = getFileIcon(file.mimeType, file.type);
                const colorClass = getFileTypeColor(file.mimeType, file.type);
                
                return (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className={`bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all duration-200 group ${
                      viewMode === 'list' ? 'flex items-center gap-4' : 'text-center'
                    }`}
                  >
                    <div className={`${colorClass} p-3 rounded-lg ${viewMode === 'list' ? 'flex-shrink-0' : 'mx-auto mb-3'}`}>
                      <FileIcon className="text-xl" />
                    </div>
                    
                    <div className={`${viewMode === 'list' ? 'flex-1' : ''}`}>
                      <h4 className="font-medium text-white mb-1 truncate" title={file.name}>
                        {file.name}
                      </h4>
                      <p className="text-white/50 text-sm mb-2">
                        {file.type === 'folder' ? 'Folder' : formatFileSize(file.size)}
                      </p>
                      {file.description && (
                        <p className="text-white/40 text-xs mb-2 line-clamp-2">
                          {file.description}
                        </p>
                      )}
                      <p className="text-white/30 text-xs">
                        {file.uploadDate}
                      </p>
                    </div>
                    
                    <div className={`${viewMode === 'list' ? 'flex gap-2' : 'mt-3 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity'}`}>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs transition-colors"
                        title="View"
                      >
                        <FaEye />
                      </motion.button>
                      
                      {file.type === 'file' && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 bg-green-600 hover:bg-green-700 text-white rounded text-xs transition-colors"
                          title="Download"
                        >
                          <FaDownload />
                        </motion.button>
                      )}
                      
                      <motion.button
                        onClick={() => deleteFile(file.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-red-600 hover:bg-red-700 text-white rounded text-xs transition-colors"
                        title="Delete"
                      >
                        <FaTrash />
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilesSection;
