import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './ContactForm.module.scss';
import {
  createRegistrationRequest,
  resetRegistrationState
} from '../../../features/registration/registrationSlice';
const cx = classNames.bind(styles);

export default function ContactForm({ onClose, classroomId }) {
  const dispatch = useDispatch();

  const { loading, success, error } = useSelector((state) => state.registration);

  const [formData, setFormData] = useState({
    companyName: '',
    fullName: '',
    email: 'abc@gmail.com',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCloseForm = () => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      window.history.back();
    } else {
      if (onClose) {
        onClose();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      classroomId: classroomId || 0,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      message: formData.companyName ? `[Công ty: ${formData.companyName}] - ${formData.message}` : formData.message,
    };

    console.log('payload: ', payload)

    // 1. Gửi dữ liệu lên API
    dispatch(createRegistrationRequest(payload));
  };


  useEffect(() => {
    if (success) {
      alert('Gửi thông tin thành công!');

      setFormData({
        companyName: '',
        fullName: '',
        email: 'abc@gmail.com',
        phone: '',
        message: ''
      });
      dispatch(resetRegistrationState());

      handleCloseForm();
    }

    if (error) {
      alert(`Có lỗi xảy ra: ${error}`);
      dispatch(resetRegistrationState());
    }
  }, [success, error, dispatch]);

  return (
    <div className={cx('form-body')}>
      <form onSubmit={handleSubmit}>
        <div className={cx('form-row')}>
          <div className={cx('form-group')}>
            <label htmlFor="companyName">Tên Công Ty</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              placeholder="Nhập tên Công Ty"
              value={formData.companyName}
              onChange={handleChange}
            />
          </div>
          <div className={cx('form-group')}>
            <label htmlFor="fullName">Họ và Tên</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Họ và Tên"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className={cx('form-row')}>
          <div className={cx('form-group')}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={cx('form-group')}>
            <label htmlFor="phone">Số điện thoại</label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Nhập số điện thoại"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className={cx('form-group', 'full-width')}>
          <label htmlFor="message">Vui lòng tư vấn cho tôi</label>
          <textarea
            id="message"
            name="message"
            placeholder="Vui lòng nhập lời nhắn"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className={cx('form-submit')}>
          <button
            type="submit"
            className={cx('submit-btn')}
            disabled={loading}
          >
            {loading ? 'Đang gửi...' : 'Gửi'}
          </button>
        </div>
      </form>
    </div>
  );
}