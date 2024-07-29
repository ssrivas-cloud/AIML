import React from 'react';
import { Drawer, Button } from '@mui/material';
import Eda from '../Eda/Eda';
const RightPanel = ({ onOpen, handleEvent, content }) => {
    const handleClose = () => {
        handleEvent(false);
    };
    return (
        <Drawer
            anchor="right"
            open={onOpen}
            onClose={handleClose}
        >
            <div
                role="presentation"
                onClick={handleClose}
                onKeyDown={handleClose}
                style={{ width: 900, padding: 20 }}
            >

                {
                    content == 'anomalies' ? <Eda/> : <></>
                }
                <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: 20 }}
                >
                    Apply advanced filter
                </Button>
            </div>
        </Drawer>
    );
};

export default RightPanel;