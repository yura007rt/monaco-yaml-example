import 'monaco-editor'
import {editor as Editor, Uri} from 'monaco-editor/esm/vs/editor/editor.api'
import type {FC} from 'react'
import {useEffect, useRef, useState} from 'react'
import {setDiagnosticsOptions} from 'monaco-yaml'

setDiagnosticsOptions({
  enableSchemaRequest: true,
  hover: true,
  completion: true,
  validate: true,
  format: true,
  schemas: [{
    uri: '/openapi-schema.json',
    fileMatch: [
      'openapi.json',
      'openapi.yml',
      'openapi.yaml',
    ],
  }],
})

export type MonacoEditorProps = {
  value: string
  language: 'yaml'
  onChange?: (value: string) => void
}

const MonacoEditor: FC<MonacoEditorProps> = ({value, language, onChange}) => {
  const [editor, setEditor] = useState<Editor.IStandaloneCodeEditor | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const model = Editor.createModel(
      value,
      language,
      Uri.parse('openapi.yml'),
    )
    const codeEditor = Editor.create(ref.current!, {
      minimap: {enabled: false},
      language: language,
      model: model,
    })
    codeEditor.onDidChangeModelContent(() => onChange?.(codeEditor.getValue()))
    setEditor(codeEditor)

    return () => {
      model.dispose()
      codeEditor.dispose()
    }
  }, [])
  useEffect(() => editor?.setValue(value), [editor, value])

  return (
    <div
      ref={ref}
      style={{height: '100%'}}
    />
  )
}

export default MonacoEditor
