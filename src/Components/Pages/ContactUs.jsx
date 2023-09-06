function ContactUs() {
  return (
    <div className='contact-form-sec'>
      <div className='container-wrap'>
        <div className='form-contact'>
          <h1 className='border-head'>Contact Us</h1>
          <form>
            <div>
              <input type='text' placeholder='Name' />
            </div>
            <div>
              <input type='text' placeholder='Email' />
            </div>
            <div>
              <input type='text' placeholder='Phone Number' />
            </div>
            <div>
              <textarea type='textarea' placeholder='Message' />
            </div>
            <input type='submit' className='send-btn' value='Send' />
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
