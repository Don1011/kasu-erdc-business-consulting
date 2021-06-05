import Layout from '../layout/Layout';
import CreateAdminForm from '../presentational/CreateAdminForm';

const CreateAdmin = () => {
    
    return (
        <Layout
            jumboShow = {false}
            pageTitle = "Create Admin"
        >
            <CreateAdminForm />
        </Layout>
        
    )
}

export default CreateAdmin;
