import {Component} from "react";
import {addTorrentFile} from "../../domain/TorrentService.ts";
import {useNavigate} from "react-router-dom";

interface UploadTorrentFileFormProps {
    navigate: (path: string) => void,
}

interface UploadTorrentFileFormState {
    file: File | null;
    uploading: boolean;
    error: string | null;
    success: boolean;
}

export class UploadTorrentFileForm extends Component<UploadTorrentFileFormProps, UploadTorrentFileFormState> {
    state: UploadTorrentFileFormState = {
        file: null,
        uploading: false,
        error: null,
        success: false,
    };

    // Handle file change
    handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            this.setState({ file: event.target.files[0], error: null });
        }
    };

    // Handle file upload
    handleFileUpload = async () => {
        const { file } = this.state;

        if (!file) {
            this.setState({ error: 'Please select a file.' });
            return;
        }

        this.setState({ uploading: true, error: null, success: false });

        try {
            await addTorrentFile(file);
            this.props.navigate("/torrents");
        } catch (err) {
            this.setState({ error: 'File upload failed. Please try again.' });
            console.error(err);
        } finally {
            this.setState({ uploading: false });
        }
    };

    render() {
        const { uploading, error, success } = this.state;

        return (
            <div>
                <h2>File Upload</h2>
                <div>
                    <input type="file" onChange={this.handleFileChange} />
                </div>
                <div>
                    <button
                        onClick={this.handleFileUpload}
                        disabled={uploading}
                        className="bg-blue-500 text-white py-2 px-4 rounded"
                    >
                        {uploading ? 'Uploading...' : 'Upload File'}
                    </button>
                </div>

                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">File uploaded successfully!</p>}
            </div>
        );
    }
}

const UploadTorrentFileFormWrapper: React.FC = () => {
    const navigate = useNavigate()

    return <UploadTorrentFileForm navigate={navigate} />;
};

export default UploadTorrentFileFormWrapper;