import { useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import {inspect} from "util";
import styles from './video.module.css'
import React, { DragEvent, useRef, ChangeEvent } from 'react';
import cx from 'classnames';

export default function Video() {
    const resolutions = ['2160P', '1080P', '720P', '360P'];
    const workers = ['External Elite Edge Node', 'Internal Worker'];
    const networks = [
        {name: 'Theta Mainnet', value: 361},
        {name: 'Theta Testnet', value: 365},
        {name: 'Ethereum Mainnet', value: 1},
        {name: 'ETH Goerli Testnet', value: 5},
    ]
    const [selectedResolutions, setSelectedResolutions] = React.useState<string[]>([]);
    const [selectedWorker, setSelectedWorker] = React.useState<string>('External Elite Edge Node');
    const [collections, setCollections] = useState([{ address: '', network: 'Theta Mainnet' }]);

    const fileInputRef = useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        setSelectedResolutions(resolutions);
    }, []);

    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        processFiles(files);
    }

    const handleClick = () => {
        fileInputRef.current?.click();
    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        processFiles(files);
    }

    const processFiles = (files: FileList | null) => {
        if (files) {
            console.log(files);
            // Further process or upload the files
        }
    }

    const toggleResolution = (resolution: string) => {
        if (selectedResolutions.includes(resolution)) {
            setSelectedResolutions(prev => prev.filter(res => res !== resolution));
        } else {
            setSelectedResolutions(prev => [...prev, resolution]);
        }
    };

    const removeResolution = (resolution: string) => {
        setSelectedResolutions(prev => prev.filter(res => res !== resolution));
    };

    // Set DRM handlers
    const handleAddCollection = () => {
        setCollections(prev => [...prev, { address: '', network: 'Theta Mainnet' }]);
    };

    const handleRemoveCollection = (index: number) => {
        setCollections(prev => prev.filter((_, i) => i !== index));
    };

    const handleAddressChange = (index: number, address: string) => {
        const newCollections = [...collections];
        newCollections[index].address = address;
        setCollections(newCollections);
    };

    const handleNetworkChange = (index: number, network: string) => {
        const newCollections = [...collections];
        newCollections[index].network = network;
        setCollections(newCollections);
    };


    return (
        <div className={styles.alignment}>
            <h1 style={{ padding: '20px'}}>New Video</h1>
            <input className={styles.videoURL} type="url" placeholder="Enter video url" />
            <p>OR</p>
            <>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    accept="video/*"
                    onChange={handleFileChange}
                />
                <div
                    id="dragDropBox"
                    className={styles.dragDropBox}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={handleClick}
                >
                    <p>Drag your video here...</p>
                </div>
            </>

            <div className={styles.selectContainer}>
                <div className={styles.selectWrapper}>
                    <label className={styles.selectLabel}>Select Resolutions:</label>
                    <Listbox>
                        {({ open }) => (
                            <>
                                <div className={styles.multiSelectDisplay}>
                                    <Listbox.Button className={styles.listBox}>
                                        {selectedResolutions.length > 0 ? selectedResolutions.map(resolution => (
                                            <span key={resolution} className={styles.selectedItem}>
                                                <div className={styles.resolutionText}>{resolution}</div>
                                                <button className={styles.buttonX} onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeResolution(resolution)}
                                                }>&times;</button>
                                        </span>
                                        )) : 'Select resolutions'}
                                    </Listbox.Button>
                                </div>
                                <Transition show={open}>
                                    <Listbox.Options className={styles.optionsBox}> {/* <-- Adjust the class here */}
                                        {resolutions.filter(res => !selectedResolutions.includes(res)).map((resolution) => (
                                            <Listbox.Option className={styles.options} key={resolution} value={resolution}>
                                                {() => (
                                                    <div className={styles.option} onClick={() => toggleResolution(resolution)}>
                                                        <span>{resolution}</span>
                                                    </div>
                                                )}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </Transition>
                            </>
                        )}
                    </Listbox>
                </div>

                <div className={styles.selectWrapper}>
                    <label className={styles.selectLabel}>Select a worker:</label>
                    <Listbox as="div" value={selectedWorker} onChange={setSelectedWorker}>
                        {({ open }) => (
                            <>
                                <Listbox.Button className={styles.listBoxWorker}>{selectedWorker}</Listbox.Button>
                                <Transition show={open}>
                                    <Listbox.Options className={styles.optionsBox}>
                                        {workers.map((worker) => (
                                            <Listbox.Option className={styles.options} key={worker} value={worker}>
                                                {({ selected }) => (
                                                    <div className={cx(styles.option, selected ? styles.selectedOption : null)}>
                                                        <span>{worker}</span>
                                                    </div>
                                                )}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </Transition>
                            </>
                        )}
                    </Listbox>
                </div>
            </div>
            {/*Input Video name stored in the metadata*/}
            <h4>Stored in metadata</h4>
            <input className={styles.videoURL} type="text" placeholder="Enter video name (optional)" />
            <input className={styles.videoURL} type="text" placeholder="Enter video description (optional)" />
            {/*Enable DRM via NFTs*/}
            <h4>Enable NFT based DRM with NFT collection address (optional)</h4>

                {collections.map((collection, index) => (
                    <div key={index} className={styles.collectionRow}>
                        <div className={styles.collectionInputs}>
                            <div className={styles.inputGroup}>
                                <label>Enter Collection#{index + 1} Address:</label>
                                <input
                                    className={styles.collectionAddress}
                                    type="text"
                                    placeholder={'Collection Address'}
                                    value={collection.address}
                                    onChange={(e) => handleAddressChange(index, e.target.value)}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Select Collection#{index + 1} Network:</label>
                                <Listbox as="div" value={collection.network} onChange={(network) => handleNetworkChange(index, network)}>
                                    {({ open }) => (
                                        <>
                                            <Listbox.Button className={styles.listBoxNetwork}>{collection.network}</Listbox.Button>
                                            <Transition show={open}>
                                                <Listbox.Options className={styles.optionsBoxNetwork}>
                                                    {networks.map((network) => (
                                                        <Listbox.Option className={styles.options} key={network.value} value={network.name}>
                                                            {({ selected }) => (
                                                                <div className={cx(styles.option, selected ? styles.selectedOption : null)}>
                                                                    <span>{network.name}</span>
                                                                </div>
                                                            )}
                                                        </Listbox.Option>
                                                    ))}
                                                </Listbox.Options>
                                            </Transition>
                                        </>
                                    )}
                                </Listbox>
                            </div>
                        </div>
                        <div style={{display:"flex", justifyContent:"end", alignItems: "center"}}>
                            <button className={styles.buttonRemove} onClick={() => handleRemoveCollection(index)}>Remove</button>
                        </div>
                    </div>
                ))}
            <button className={styles.basicButton} onClick={handleAddCollection}>Add another NFT collection</button>
            <p style={{width:'600px', color:'var(--secondary-text-color)', textAlign: 'center'}}>If a collection address is added, users MUST have at least one NFT from the specified collection in order to view the video.</p>
            <button className={styles.basicButton} onClick={() => {console.log('save')}}>Save</button>
        </div>
    );
}
