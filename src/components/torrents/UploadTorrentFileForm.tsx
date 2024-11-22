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

    handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            this.setState({ file: event.target.files[0], error: null });
        }
    };

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
        } finally {
            this.setState({ uploading: false });
        }
    };

    render() {
        const { uploading, error, success } = this.state;

        return (
            <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md mt-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Upload Torrent File</h2>

                <div className="mb-4">
                    <label
                        className="block text-gray-700 font-semibold mb-2"
                        htmlFor="torrentFile"
                    >
                        Select a torrent file to upload:
                    </label>
                    <input
                        id="torrentFile"
                        type="file"
                        onChange={this.handleFileChange}
                        className="block w-full text-gray-700 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <button
                    onClick={this.handleFileUpload}
                    disabled={uploading}
                    className={`w-full py-2 px-4 rounded-md text-white font-semibold shadow-md ${
                        uploading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                >
                    {uploading ? 'Uploading...' : 'Upload File'}
                </button>

                {error && (
                    <p className="mt-4 text-sm text-red-500 bg-red-100 border border-red-400 rounded-md p-2">
                        {error}
                    </p>
                )}

                {success && (
                    <p className="mt-4 text-sm text-green-500 bg-green-100 border border-green-400 rounded-md p-2">
                        File uploaded successfully!
                    </p>
                )}
            </div>
        );
    }
}

const UploadTorrentFileFormWrapper: React.FC = () => {
    const navigate = useNavigate()

    return <UploadTorrentFileForm navigate={navigate} />;
};

export default UploadTorrentFileFormWrapper;