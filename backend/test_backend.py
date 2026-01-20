import requests
from fpdf import FPDF
import io

# 1. Create a dummy PDF in memory
pdf = FPDF()
pdf.add_page()
pdf.set_font("Arial", size=12)
pdf.cell(200, 10, txt="John Doe. Software Engineer. Python, JavaScript, React. Experienced in building full stack apps.", ln=1, align="C")
pdf_bytes = pdf.output(dest='S').encode('latin-1')

# 2. Define payload
url = "http://localhost:8000/analyze"
files = {
    'resume': ('test_resume.pdf', pdf_bytes, 'application/pdf')
}
data = {
    'job_description': 'We are looking for a Software Engineer with Python and React experience.'
}

# 3. Send Request
print(f"Sending request to {url}...")
try:
    response = requests.post(url, files=files, data=data)
    print(f"Status Code: {response.status_code}")
    if response.status_code == 200:
        print("Success! JSON Response:")
        print(response.json())
    else:
        print("Error Response:")
        print(response.text)
except Exception as e:
    print(f"Failed to connect: {e}")
