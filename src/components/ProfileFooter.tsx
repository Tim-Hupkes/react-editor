type ProfileFooterProps = {
  imageSrc: string
}

export function ProfileFooter({ imageSrc }: ProfileFooterProps) {
  return (
    <footer className="profile-footer">
      <a href="mailto:tim@timhupkes.com">Contact Tim</a>
      <img src={imageSrc} alt="Tim Hupkes" />
    </footer>
  )
}
