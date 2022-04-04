import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import monacoEditor from 'vite-plugin-monaco-editor'

const monacoEditorPlugin = monacoEditor({
    languageWorkers: ['editorWorkerService'],
    customWorkers: [{
        label: 'yaml',
        entry: 'monaco-yaml/yaml.worker',
    }],
})

export default defineConfig(() => {
    return {
        plugins: [
            react(),
            monacoEditorPlugin,
        ]
    }
})
