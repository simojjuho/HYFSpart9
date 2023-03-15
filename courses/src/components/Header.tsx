interface HeadingProps{
    heading: string
}

const Header = ({heading}: HeadingProps) => {
    return (
        <h1>{heading}</h1>
    );
}

export default Header;