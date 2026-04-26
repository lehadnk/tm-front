import {Component} from "react";
import {addTorrentFile} from "../../domain/TorrentService.ts";
import {Link, useNavigate} from "react-router-dom";

interface UploadTorrentFileFormProps {
    navigate: (path: string) => void,
}

interface UploadTorrentFileFormState {
    file: File | null;
    uploading: boolean;
    error: string | null;
    isDragOver: boolean;
}

export class UploadTorrentFileForm extends Component<UploadTorrentFileFormProps, UploadTorrentFileFormState> {
    state: UploadTorrentFileFormState = {
        file: null,
        uploading: false,
        error: null,
        isDragOver: false,
    };

    componentDidMount() {
        window.addEventListener("paste", this.handlePaste);
    }

    componentWillUnmount() {
        window.removeEventListener("paste", this.handlePaste);
    }

    setSelectedFile(file: File | null) {
        this.setState({
            file,
            error: file ? null : this.state.error,
            isDragOver: false,
        });
    }

    handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            this.setSelectedFile(event.target.files[0]);
        }
    };

    handlePaste = (event: ClipboardEvent) => {
        const clipboardItems = event.clipboardData?.items;
        if (!clipboardItems) {
            return;
        }

        for (const item of Array.from(clipboardItems)) {
            const file = item.getAsFile();
            if (file) {
                event.preventDefault();
                this.setSelectedFile(file);
                return;
            }
        }
    };

    handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        if (!this.state.isDragOver) {
            this.setState({ isDragOver: true });
        }
    };

    handleDragLeave = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        if (event.currentTarget.contains(event.relatedTarget as Node | null)) {
            return;
        }

        this.setState({ isDragOver: false });
    };

    handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files?.[0] ?? null;
        if (droppedFile) {
            this.setSelectedFile(droppedFile);
            return;
        }

        this.setState({ isDragOver: false });
    };

    handleFileUpload = async () => {
        const { file } = this.state;

        if (!file) {
            this.setState({ error: 'Please select a file.' });
            return;
        }

        this.setState({ uploading: true, error: null });

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
        const { file, uploading, error, isDragOver } = this.state;

        return (
            <div className="app-shell">
                <div className="app-shell-bg absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.14),_transparent_36%),radial-gradient(circle_at_82%_16%,_rgba(6,182,212,0.10),_transparent_28%),linear-gradient(180deg,_#f3f4f6_0%,_#eef3fb_14%,_#f7fafc_42%,_#eef2ff_100%)]" />
                <div className="app-shell-bg absolute left-[-8rem] top-32 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />
                <div className="app-shell-bg absolute right-[-8rem] top-40 h-80 w-80 rounded-full bg-indigo-400/20 blur-3xl" />

                <div className="page-enter relative mx-auto flex min-h-[calc(100dvh-var(--app-header-offset,0px)-2rem)] max-w-3xl items-center px-4 pb-8 pt-[calc(var(--app-header-offset,0px)+1rem)] sm:px-6 lg:px-8">
                    <section className="w-full rounded-[32px] border border-white/60 bg-white/82 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.12)] backdrop-blur">
                        <div className="mb-5 flex items-center justify-between gap-3">
                            <Link
                                to="/torrents"
                                className="inline-flex items-center rounded-2xl border border-slate-200 bg-white/75 px-3.5 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                            >
                                Back to Torrents
                            </Link>
                        </div>

                        <div>
                            <label
                                className={`group flex cursor-pointer flex-col rounded-[28px] border border-dashed p-6 transition ${
                                    isDragOver
                                        ? "border-sky-500 bg-sky-50/80 shadow-[0_18px_40px_rgba(14,165,233,0.14)]"
                                        : "border-slate-300 bg-slate-50/70 hover:border-sky-400 hover:bg-sky-50/60"
                                }`}
                                htmlFor="torrentFile"
                                onDragOver={this.handleDragOver}
                                onDragLeave={this.handleDragLeave}
                                onDrop={this.handleDrop}
                            >
                                <span className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Torrent file</span>
                                <span className="mt-3 text-lg font-semibold text-slate-900">
                                    {file ? file.name : "Drop file here, click to choose, or paste with Ctrl+V"}
                                </span>
                                <span className="mt-2 text-sm text-slate-500">
                                    {file ? "Файл выбран и готов к отправке." : "Поддерживаются drag & drop, обычный выбор файла и вставка из буфера."}
                                </span>
                                <input
                                    id="torrentFile"
                                    type="file"
                                    onChange={this.handleFileChange}
                                    className="sr-only"
                                />
                            </label>
                        </div>

                        <button
                            onClick={this.handleFileUpload}
                            disabled={uploading}
                            className={`mt-6 inline-flex w-full items-center justify-center rounded-[22px] px-4 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(37,99,235,0.28)] transition ${
                                uploading
                                    ? "cursor-not-allowed bg-slate-400 shadow-none"
                                    : "bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 hover:-translate-y-0.5 hover:shadow-[0_24px_50px_rgba(37,99,235,0.35)]"
                            }`}
                        >
                            {uploading ? "Uploading..." : "Upload File"}
                        </button>

                        {error && (
                            <p className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                                {error}
                            </p>
                        )}

                        <div className="mt-6 rounded-[24px] border border-slate-200/80 bg-slate-50/80 p-4">
                            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Tips</div>
                            <div className="mt-2 text-sm text-slate-600">
                                Click to choose a file, drag it сюда, или вставьте через `Ctrl+V`.
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

const UploadTorrentFileFormWrapper: React.FC = () => {
    const navigate = useNavigate()

    return <UploadTorrentFileForm navigate={navigate} />;
};

export default UploadTorrentFileFormWrapper;
