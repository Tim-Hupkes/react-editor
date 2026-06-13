import { useState, useEffect } from 'react'
import TimPhoto from './assets/Foto-Tim-editorPhoto.png'
import { jsPDF } from 'jspdf'

function App() {
 const [text, setText] = useState(() => {
  const savedText = localStorage.getItem('savedText')
  return savedText || ''})

  const saveText = () => {
  console.log('Saving text:', text)
  localStorage.setItem('savedText', text)
  setLastSaved(new Date().toLocaleTimeString())
  alert('Saved')}
  const [darkMode, setDarkMode] = useState(false)
  const clearText = () => {
    if (window.confirm('Are you sure you want to clear the text? This cannot be undone.')) {  
    setText('')    }}
  const wordCount = text.trim() 
  === '' ? 0 : text.trim().split(/\s+/).length
const [fontsize, setFontSize] = useState(window.innerWidth <= 768 ? 16 : 18)



const [lastSaved, setLastSaved] = useState('')

const [fileName, setFileName] = useState('')

useEffect(() => {
  localStorage.setItem('savedText', text)
  setLastSaved(new Date().toLocaleTimeString())
}, [text])

const [showPreview, setShowPreview] = useState(true)
const copyToClipboard = () => {
  navigator.clipboard.writeText(text)
  alert('Text copied to clipboard!')
  }
const downloadTextFile = () => {
  const today = new Date().toISOString().split('T')[0]
  const element = document.createElement('a')
  const file = new Blob([text], { type: 'text/plain' })
  element.href = URL.createObjectURL(file)
  element.download = 
    fileName.trim() === '' ? `untitled-${today}.txt`
     : `${fileName}-${today}.txt`
  document.body.appendChild(element)
  element.click()
} 

const downloadPDF = () => {
  const doc = new jsPDF()
  const lines = doc.splitTextToSize(text, 180)
  doc.text(lines, 10, 10)
  const today = new Date().toISOString().split('T')[0]
  const pdfFileName = fileName.trim() === 
  '' ? `untitled-${today}.pdf` : `${fileName}-${today}.pdf`
  doc.save(pdfFileName)
} 

const isMobile = window.innerWidth <= 768;

const buttonStyle = {
  fontSize: isMobile ? '14px' : '18px',
  padding: isMobile ? '8px 16px' : '12px 28px',
};



 return (

    <div style={{
  backgroundColor: darkMode ? '#200447' : '#f0f0f0',
  color: darkMode ? 'white' : 'black',
  minHeight: '100vh',
 
  fontFamily: 'Arial, sans-serif',
  textAlign: 'center',
}}>
      <h1 style={{ fontSize: '30px', marginBottom: '0px', 
      color: darkMode ? '#fcfcf8' : '#014d66'




      }}>Welcome to Tim's Editor
<br /></h1>

      <h1 style={{ fontSize: '30px', marginTop: '20px', 
        marginBottom: '50px', color: darkMode ? '#fcfcf8' :
         '#014d66'
      }}>
Have at it!
      </h1>

<div
style={{
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '20px',
  marginBottom: '30px',
  flexWrap: 'wrap',
}}
>

<button onClick={() => setDarkMode(!darkMode)}
style={{
  ...buttonStyle,
  backgroundColor: darkMode ? '#ae0e8c' : '#ae0e8c',
  color: 'white',

  fontWeight: 'bold',
  borderRadius: '10px',
  border: 'none',
  cursor: 'pointer',
  display: 'block',
 
}}
>
{darkMode ? 'Light Mode' : 'Dark Mode'}
</button>

<button onClick={() => setShowPreview(!showPreview)}
style={{
   ...buttonStyle,
  backgroundColor: darkMode ? '#ae0e8c' : '#ae0e8c',
  color: 'white',

  fontWeight: 'bold',
  borderRadius: '10px',
  border: 'none',
  cursor: 'pointer',
  display: 'block',
  
}}
>
{showPreview ? 'Hide Preview' : 'Show Preview'}
</button>


<button onClick={() => setFontSize(fontsize + 2)}
style={{
   ...buttonStyle,
  backgroundColor: darkMode ? '#ae0e8c' : '#ae0e8c',
  color: 'white',

  fontWeight: 'bold',
  borderRadius: '10px',
  border: 'none',
  cursor: 'pointer',
  display: 'block',
  
}}
>
A+</button>

<button onClick={() => setFontSize(fontsize - 2)}
style={{
...buttonStyle,
  backgroundColor: darkMode ? '#ae0e8c' : '#ae0e8c',
  color: 'white',

  fontWeight: 'bold',
  borderRadius: '10px',
  border: 'none',
  cursor: 'pointer',
  display: 'block',
  
}}
>
A-</button> 

<input
  type="text"
  value={fileName}
  onChange={(e) => setFileName(e.target.value)}
  placeholder="Put name of your file here"
  style={{
    backgroundColor: darkMode ? '#4d0247' : 'white',
    color: darkMode ? 'white' : 'black',
    border: '2px solid #014d66',
    padding: '10px',
    fontSize: '16px',
  }}
/>

</div>


      <h2 style={{ marginTop: '0px', 
      color: darkMode ? '#f25dc8' : '#014d66'
       }}>Type here ⤵️</h2>
      
      <textarea value={text} 
      onChange={(e) => setText(e.target.value)}
      style={{
        width: '100%',
        maxWidth: '700px',
        boxSizing: 'border-box',
        height: window.innerWidth < 768 ? '200px' : '300px',
        fontSize: `${fontsize}px`,
        padding: '20px',
        marginTop: '20px',
        backgroundColor: darkMode ? '#4d0247' : 'white',
        color: darkMode ? 'white' : 'black',
        border: '2px solid  #4d0247',
      }}
      
      ></textarea>

<div
style={{
  display: 'flex',
justifyContent: 'center',
  alignItems: 'center',
  gap: '20px',
  flexWrap: 'wrap',
}}
>



<button onClick={copyToClipboard}
style={{
   ...buttonStyle,
  backgroundColor: '#7b0962',
  color: 'white',
    fontWeight: 'bold',
  borderRadius: '20px',
  border: 'none',
  cursor: 'pointer',
  
}}
>
Copy Text</button>

<button onClick={saveText}
style={{
   ...buttonStyle,
  backgroundColor: '#7b0962',
  color: 'white',

  fontWeight: 'bold', 
  borderRadius: '20px',
  border: 'none',
  cursor: 'pointer',
 
}}
>Save Text </button>


</div>

{showPreview && (
  <>
  <p style={{  
     ...buttonStyle,
    fontWeight: 'bold',
  marginTop: '20px',
  marginBottom: '20px',
  color: darkMode ? '#f25dc8' : '#014d66',
   }}>
    Preview
    </p>

  <p style={{
    width: '100%',
    maxWidth: '700px',
    boxSizing: 'border-box',
    fontSize: `${fontsize}px`,
     backgroundColor: darkMode ? '#4d0247' : 'white',
     color: darkMode ? 'white' : 'black',
     border: '2px solid  #4d0247',
       marginTop: '20px',
  marginBottom: '20px',
  marginLeft: 'auto',
  marginRight: 'auto',
    textAlign: 'left'
 }}>{text}</p>
 </>
)}


<div style={{ marginTop: '20px', marginBottom: '20px' }}>
<button onClick={clearText}
style={{ 
   ...buttonStyle,
  backgroundColor: '#ef0e24',
  color: 'white',

  fontWeight: 'bold', 
  borderRadius: '10px',
  border: 'none',
  cursor: 'pointer',
  marginBottom: '20px',
  marginTop: '20px',
}}
>Clear Text</button>
</div>


<div

style={{
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '20px',
  marginBottom: '30px',
  flexWrap: 'wrap',
}}

>
<button onClick={downloadTextFile}
style={{
   ...buttonStyle,
  backgroundColor: '#7b0962',
  color: 'white',

  fontWeight: 'bold',
  borderRadius: '10px',
  border: 'none',
  cursor: 'pointer',
}}
>
Download Text</button>

<button onClick={downloadPDF}
style={{
  ...buttonStyle,
  backgroundColor: '#7b0962',
  color: 'white',
 
  fontWeight: 'bold',
  borderRadius: '10px',
  border: 'none',
  cursor: 'pointer',

}}
>
Download PDF</button>
</div>



<p>{text.length} characters</p>

<p>{wordCount} words</p>



<p>Last saved at: {lastSaved}</p>



<a href='mailto:tim@timhupkes.com' 
style={{
color: darkMode ? '#d9bbf9' : '#014d66',
}}
>
Contact Tim</a>

<img src={TimPhoto} alt='Tim Hupkes' style={{ 
  width: '200px', borderRadius: '100px', display:
   'block', margin: '20px auto' }} />
</div>

)}


export default App