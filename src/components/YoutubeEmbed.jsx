export function YoutubeEmbed({ id }) {
  return (
    <div className="aspect-video w-full overflow-hidden rounded-md">
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        className="h-full w-full"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  )
}
