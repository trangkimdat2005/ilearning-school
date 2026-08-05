import BannerCarousel from "../../components/organisms/BannerCarousel/BannerCarousel";
import VideoEmbed from "../../components/organisms/VideoEmbed/VideoEmbed";
import IntroContent from "../../components/organisms/IntroContent/IntroContent";
import SectionHeader from "../../components/molecules/SectionHeader/SectionHeader";
import CourseSection from "../../components/organisms/CourseSection/CourseSection";
import Button from "../../components/atoms/Button/Button";
import TestimonialSection from "../../components/organisms/TestimonialSection/TestimonialSection";
import MentorCarousel from "../../components/organisms/MentorCarousel/MentorCarousel";
import PartnerCarousel from "../../components/organisms/PartnerCarousel/PartnerCarousel";

export default function Home() {
    return (
        <div className="home-container">
            {/* Gắn Banner Carousel lên đầu trang chủ */}
            <BannerCarousel />

            <VideoEmbed />

            <IntroContent />

            <div id="section-courses">
                <SectionHeader
                    topText="Trải nghiệm dự án thực tế cùng UI8"
                    bottomText="Các khoá học sắp khai giảng"

                /></div>


            <CourseSection />

            <div id="section-testimonials">
                <SectionHeader
                    topText="Cảm nhận của học viên"
                    bottomText="Mọi người nói gì về UI8"
                />
            </div>

            <TestimonialSection />
            <div id="section-mentors">
                <SectionHeader
                    topText="Nhân sự nòng cốt"
                    bottomText="Đội ngũ giảng viên"
                />
            </div>
            <MentorCarousel />
            <div id="section-blog">
                <SectionHeader
                    topText="Khách hàng và"
                    bottomText="Đối tác của UI8"
                />
            </div>

            <PartnerCarousel />
        </div>
    );
}