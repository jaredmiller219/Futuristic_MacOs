import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  getVolume: () => ipcRenderer.invoke('get-volume')
})