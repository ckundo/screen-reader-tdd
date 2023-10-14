import './App.css';
import React from 'react';

function App() {
    const [open, setOpen] = React.useState(false);
    const emailRef = React.useRef<HTMLInputElement>(null);
    const triggerRef = React.useRef<HTMLButtonElement>(null);

    React.useEffect(() => {
        if (!!open) {
            emailRef.current?.focus();
        }
    }, [open]);

    function handleKeyDown(e: React.KeyboardEvent<HTMLDialogElement>) {
        setOpen(false);
        triggerRef.current?.focus();
    }

    return (
        <div>
            <button ref={triggerRef} onClick={() => {
                setOpen((open: boolean) => !open)
            }}>Invite a friend</button>

        <dialog open={open} onKeyDown={handleKeyDown}>
            <button>close</button>
            <label htmlFor="email">Email address</label>
            <input id="email" ref={emailRef} type="email" />
            <label htmlFor="username">Username</label>
            <input id="username" type="text"></input>
        </dialog>
    </div>
);
}

export default App;
