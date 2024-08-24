import { useEffect } from "react";

const useClickOutsideHide = (ref, doSomething) => {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                doSomething()
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

export default useClickOutsideHide