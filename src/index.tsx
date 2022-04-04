import React from 'react'
import { createRoot } from 'react-dom/client'
import MonacoEditor from './MonacoEditor'

const container = document.createElement('div')
document.body.appendChild(container)
createRoot(container).render(
    <div style={{'height':'400px'}}>
        <MonacoEditor
            value={'initial'}
            language="yaml"/>
    </div>
)
