import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import Button from '../../atoms/Button';
import ContactModal from '../../organisms/ContactModal';
import MobileMenu from '../../organisms/MobileMenu';
import styles from './HeaderActions.module.scss';

const cx = classNames.bind(styles);

export default function HeaderActions() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleOpenContact = (e) => {
        e.preventDefault();

        if (window.innerWidth < 768) {
            navigate('/lien-he');
        } else {
            setIsModalOpen(true);
        }
    };

    return (
        <div className={cx('header-hide')}>
            <Button
                className={cx('header-button-suport', 'open-modal-btn')}
                onClick={handleOpenContact}
            >
                Liên hệ tư vấn
            </Button>

            <MobileMenu />

            <ContactModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}
