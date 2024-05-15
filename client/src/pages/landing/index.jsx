import PageWrapper from "../../components/PageWrapper";
import logo from '../../assets/logo.png'; 
import LoginWrapper from "../../components/LoginWrapper";

const Landing = () => {
    return (
        <PageWrapper>
            <div className="flex flex-col h-screen items-center justify-center">
                <h1>Indie GPT</h1>
                <img src={logo} alt="Indie GPT logo" className="w-[80px]" />

                <div className="flex flex-col mt-5  gap-2">
                    <LoginWrapper redirectPath={"/dashboard"} />
                </div>
            </div>
        </PageWrapper>
    );
};

export default Landing;