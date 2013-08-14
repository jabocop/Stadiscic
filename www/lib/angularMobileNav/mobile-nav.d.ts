
interface IMobileNavigate {
    go(location: string, transition: string): void;
    back();
}