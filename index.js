import {editor, Uri} from "monaco-editor";
import {setDiagnosticsOptions} from "monaco-yaml";
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import YamlWorker from 'monaco-yaml/yaml.worker?worker';

window.MonacoEnvironment = {
    getWorker(moduleId, label) {
        switch (label) {
            case 'editorWorkerService':
                return new EditorWorker()
            case 'yaml':
                return new YamlWorker()
            default:
                throw new Error(`Unknown label ${label}`)
        }
    },
}
// The uri is used for the schema file match.
setDiagnosticsOptions({
    enableSchemaRequest: true,
    hover: true,
    completion: true,
    validate: true,
    format: true,
    schemas: [{
        uri: 'http://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/schemas/v3.1/schema.json',
        fileMatch: [
            'openapi.json',
            'openapi.yml',
            'openapi.yaml',
        ],
    }],
})

const value = 'p1: \np2: \n';

editor.create(document.getElementById('editor'), {
    automaticLayout: true,
    model: editor.createModel(value, 'yaml', Uri.parse("openapi.yml")),
});
