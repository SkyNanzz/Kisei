// For Pages Router (pages/players.jsx)
import Head from 'next/head';
import PlayerSkinViewer from '../components/PlayerSkinViewer';

export default function PlayersPage() {
  return (
    <>
      <Head>
        <title>Players - Kisei</title>
        <meta name="description" content="View and upload Minecraft player skins in 3D" />
      </Head>
      
      <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              Player Skin Gallery
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Upload your Minecraft skin and see your character come to life in 3D!
            </p>
          </div>
          
          <PlayerSkinViewer />
          
          <div className="mt-16 text-center">
            <a 
              href="/"
              className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Home
            </a>
          </div>
        </div>
      </main>
    </>
  );
}