import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AvatarUI from '@mui/material/Avatar';

const Avatar = () => {
    const [image, setImage] = React.useState<File | null>(null);

    const handleUploadChange: React.ChangeEventHandler<
        HTMLInputElement
    > = e => {
        const { files } = e.target;

        if (files) {
            setImage(files[0]);
        }
    };

    const handleDelete = () => {
        setImage(null);
    };

    return (
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
            <AvatarUI
                sx={{ width: '140px', height: '140px' }}
                src={image ? URL.createObjectURL(image) : undefined}
            />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                }}
            >
                <label>
                    <input
                        type='file'
                        accept='image/*'
                        style={{ display: 'none' }}
                        name='avatar'
                        onChange={handleUploadChange}
                    />
                    <Button variant='contained' component='span'>
                        Upload
                    </Button>
                </label>
                <Button onClick={handleDelete}>Delete</Button>
            </Box>
        </Box>
    );
};

export default Avatar;
