import Layout from '../layout/Layout';
import CreateFolderForm from '../presentational/CreateFolderForm';

const CreateFolder = () => {
    return (
        <Layout
            jumboShow = {false}
            pageTitle = "Create Folder"
        >
            <CreateFolderForm />
        </Layout>
    )
}

export default CreateFolder
