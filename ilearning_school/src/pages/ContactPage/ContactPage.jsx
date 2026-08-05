import ContactForm from "../../components/molecules/ContactForm/ContactForm";

export default function ContactPage() {
  return (
    <div className="mobile-contact-page">
      <div className="modal-form">
        <div className="form-header">
          <h2 className="modal-title">Thông tin liên hệ</h2>
        </div>
        
        {/* NHÚNG RUỘT FORM VÀO ĐÂY */}
        <ContactForm />
        
      </div>
    </div>
  );
}