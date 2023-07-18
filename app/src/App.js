import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Card, Button } from 'react-bootstrap'
import { handleDataEntry } from './helper/axios';
function App() {
  const [vendor, setVendor] = React.useState('')
  const [date, setDate] = React.useState('')
  const [file, setFile] = React.useState()

  const onSubmit = async (e) => {
    e.preventDefault()
    await handleDataEntry(vendor, date, file)
  }
  const onVendorChange = (e) => {
    setVendor(e.target.value)
  }
  const onDateChange = (e) => {
    setDate(e.target.value)
  }
  const onFileUpload = (e) => {
    setFile(e.target.files[0])
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100vh' }}>
      <Card style={{ width: '600px' }}>
        <Card.Body >
          <Form method='multipart/form-data' style={{ width: '100%' }} onSubmit={onSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
              <Form.Label column sm="2">
                Vendor
              </Form.Label>
              <Col sm="10">
                <Form.Control type='text' onChange={onVendorChange} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
              <Form.Label column sm="2">
                Date
              </Form.Label>
              <Col sm="10">
                <Form.Control type='date' onChange={onDateChange} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
              <Form.Label column sm="2">
                File
              </Form.Label>
              <Col sm="10">
                <Form.Control type="file" onChange={onFileUpload} />
              </Col>
            </Form.Group>
            <div className="d-grid gap-2">
              <Button variant="primary" type="submit" size="lg">
                Submit
              </Button>

            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>

  );
}

export default App;
