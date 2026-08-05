export default function VideoEmbed({ 
  embedUrl = "https://www.youtube.com/embed/N536pWbWGRk", 
  title = "YouTube video player" 
}) {
  return (
    <div className="content-video">
      <iframe 
        src={embedUrl} 
        title={title} 
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}
