import '../vendors/loaders.min.css'
import './reset.css'
import './index.css'
import avReset from './avReset'
import loadSongs from './loadSongs'
import tabs from './tabs'
import searchSongs from './searchSongs'
avReset();
tabs(".tabs",".mainPages");
loadSongs();
searchSongs();