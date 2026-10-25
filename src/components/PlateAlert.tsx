interface Props {
    messages: string[];
    onClose: () => void;
}

export function PlateAlert({ messages, onClose }: Props) {
    return (
        <div class="alert alert-info plate-alert">
            <button type="button" class="close" onClick={onClose}>x</button>
            <ul>
                {messages.map(msg => <li key={msg}>{msg}</li>)}
            </ul>
        </div>
    );
}
