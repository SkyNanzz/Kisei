import { useEffect, useRef, useState } from 'react';
import { SkinViewer } from 'skinview3d';
import * as THREE from 'three';

export default function PlayerSkinViewer() {
  const containerRef = useRef(null);
  const viewerRef = useRef(null);
  const [skinUrl, setSkinUrl] = useState('/default-skin.png'); // Default skin path
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  // Initialize the 3D viewer
  useEffect(() => {
    if (!containerRef.current) return;

    // Create viewer instance
    const viewer = new SkinViewer({
      canvas: document.createElement('canvas'),
      width: 300,
      height: 400,
      skin: skinUrl,
      animation: {
        idle: true,
        walk: false,
        dance: false
      }
    });

    // Add background grid
    viewer.setBackground('#f0f0f0', 0.8);
    
    // Add controls
    const controls = viewer.addControls();
    controls.enableRotate = true;
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.minDistance = 2;
    controls.maxDistance = 10;
    
    // Set initial camera position
    viewer.camera.position.set(0, 0, 4);
    viewer.camera.lookAt(0, 0, 0);
    
    // Add to container
    containerRef.current.appendChild(viewer.canvas);
    
    // Save reference
    viewerRef.current = viewer;
    
    // Cleanup
    return () => {
      if (viewer) {
        viewer.dispose();
        containerRef.current?.removeChild(viewer.canvas);
      }
    };
  }, []);

  // Load skin when URL changes
  useEffect(() => {
    if (!viewerRef.current) return;
    
    setIsLoading(true);
    setError(null);
    
    viewerRef.current.loadSkin(skinUrl)
      .then(() => {
        setIsLoading(false);
        // Play idle animation
        viewerRef.current.animations.idle?.play();
      })
      .catch(err => {
        console.error('Failed to load skin:', err);
        setError('Failed to load skin. Please ensure it\'s a valid Minecraft skin (64x64 or 64x32 PNG).');
        setIsLoading(false);
      });
  }, [skinUrl]);

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.match('image.*')) {
      setError('Please upload a valid image file (PNG format recommended).');
      return;
    }
    
    // Validate file size (Minecraft skins are typically < 100KB)
    if (file.size > 500000) { // 500KB limit
      setError('File too large. Minecraft skins should be under 500KB.');
      return;
    }
    
    // Create object URL
    const url = URL.createObjectURL(file);
    setSkinUrl(url);
    
    // Reset error
    setError(null);
    
    // Clear file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Reset to default skin
  const resetToDefault = () => {
    setSkinUrl('/default-skin.png');
    setError(null);
  };

  return (
    <div className="skin-viewer-container max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">3D Player Skin Viewer</h2>
      
      <div 
        ref={containerRef} 
        className="skin-viewer w-full h-[400px] bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden"
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
            <div className="text-white text-lg">Loading skin...</div>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-red-50 bg-opacity-90 p-4">
            <div className="text-red-600 text-center">{error}</div>
          </div>
        )}
      </div>
      
      <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            Upload Skin
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/png,image/jpeg"
            className="hidden"
          />
          
          <button
            onClick={resetToDefault}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium rounded-lg transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
            Reset
          </button>
        </div>
        
        <div className="text-sm text-gray-600 mt-2 sm:mt-0">
          <p>Supported formats: PNG (64x64 or 64x32)</p>
          <p>Tip: Rotate and zoom with your mouse!</p>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-bold text-blue-800 mb-2">How to get your skin:</h3>
        <ol className="list-decimal list-inside space-y-1 text-blue-700">
          <li>Go to <a href="https://minecraft.net" target="_blank" rel="noopener noreferrer" className="underline">minecraft.net</a> and download your skin</li>
          <li>Or use a skin database like <a href="https://namemc.com" target="_blank" rel="noopener noreferrer" className="underline">NameMC</a></li>
          <li>Click "Upload Skin" above to see your character in 3D!</li>
        </ol>
      </div>
    </div>
  );
}