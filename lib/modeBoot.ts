export const MODE_STORAGE_KEY = "sz-mode";

/**
 * Runs in <head> before first paint so the page never flashes the wrong mode.
 * Priority: ?mode= in the URL (shareable "skim links"), then the reader's last choice.
 */
export const modeBootScript = `(function(){try{var d=document.documentElement;var m=localStorage.getItem('${MODE_STORAGE_KEY}');var q=new URLSearchParams(location.search).get('mode');if(q==='skim'||q==='deep')m=q;d.dataset.mode=m==='skim'?'skim':'deep';}catch(e){document.documentElement.dataset.mode='deep';}})();`;
