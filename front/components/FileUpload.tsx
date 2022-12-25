import React, {useRef} from 'react';

interface FileUploadProps {
    setFile: Function;
    accept: string;
    children: React.ReactNode;
}

const FileUpload: React.FC<FileUploadProps> = ({ setFile, accept, children}) => {
    const ref = useRef<HTMLInputElement>()

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files[0])
    }

    return (
        <div className='max-h-80 h-80 bg-gray-300/20' onClick={() => ref.current.click()}>
            <input type="file" accept={accept} className='hidden' ref={ref} onChange={onChange}/>
            {children}
        </div>
    );
};

export default FileUpload;
