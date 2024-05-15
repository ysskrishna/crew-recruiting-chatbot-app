import { ToastContainer } from 'react-toastify';

const PageWrapper = ({ children }) => {
    return (
        <div>
            {children}
            <ToastContainer />
        </div>
    )
};

export default PageWrapper;