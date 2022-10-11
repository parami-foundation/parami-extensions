import React, { useCallback, useState } from 'react';
import './Advertisement.css';
import config from '../../config';

const Advertisement: React.FC<{
	ad: any;
	avatarSrc?: string;
}> = ({ ad, avatarSrc }) => {

	const [showInstructions, setShowInstructions] = useState<boolean>(false);
	const [closePopoverTimeout, setClosePopoverTimeout] = useState<any>();

	const tags = (ad?.instructions ?? []).map((instruction: any) => instruction.tag).filter(Boolean);

	const openClaimWindow = () => {
		window.open(`${config.paramiWallet}/claim/${ad.adId}/${ad.nftId}`, 'Parami Claim', 'popup,width=400,height=600');
	}

	const openCreateAccountWindow = () => {
		window.open(`${config.paramiWallet}/create/popup`, 'Parami Create DID', 'popup,width=400,height=600');
	}

	const openInstructionPopover = useCallback(() => {
		// clear timeout
		if (closePopoverTimeout) {
			clearTimeout(closePopoverTimeout);
			setClosePopoverTimeout(null);
		}
		// open popover
		setShowInstructions(true);
	}, [closePopoverTimeout]);

	const delayCloseInstructionPopover = () => {
		const timeout = setTimeout(() => {
			setShowInstructions(false);
		}, 200);
		setClosePopoverTimeout(timeout);
	}

	return (
		<>
			<div className='advertisementContainer'>
				<div className='ownerInfo'>
					<span>📢 This hNFT is reserved.</span>
					<a className='claimLink' href={`${config.paramiWallet}`} target='_blank'>I am the owner</a>
				</div>
				<div className='sponsorInfo'>
					{ad?.icon && <img referrerPolicy='no-referrer' className='sponsorIcon' src={ad?.icon}></img>}
					<span className='sponsorText'><span className='sponsorName'>{ad?.sponsorName ?? 'Parami'}</span>is sponsoring this hNFT</span>
					<div className='bidBtn' onClick={() => window.open(`${config.paramiWallet}/dashboard`)}>BID</div>
				</div>
				<img
					src={ad?.media}
					referrerPolicy='no-referrer'
					className='adMediaImg'
				/>
				<div className='adDescription'>
					<span className='descriptionText'>{ad?.description ?? 'View Ads. Get Paid.'}</span>
					{tags?.length > 0 && <span className='tags'>
						{tags.map((tag: string, index: number) => <span className='tag' key={index}>#{tag}</span>)}
					</span>}
				</div>

				{!ad?.userDid && <div className='noDidSection'>
					<div className='createDidBtn actionBtn' onClick={() => openCreateAccountWindow()}>Create DID and claim!</div>
				</div>}

				{!!ad?.userDid && <div className='claimSection'>
					<div className='infoText'>Due to your Reputation Score you are rewarded:</div>
					<div className='rewardRow'>
						<div className='rewardInfo'>
							<img referrerPolicy='no-referrer' className='kolIcon' src={avatarSrc}></img>
							<span className='rewardAmount'>
								<span className='rewardNumber'>{ad?.rewardAmount ?? '300.00'}</span>
								<span className='rewardToken'>{ad?.assetName} NFT Power</span>
							</span>
						</div>
						<div className='buttons'>
							<>
								<div className='claimBtn actionBtn' onClick={() => openClaimWindow()}>Claim</div>
								<div className='instructionsBtn actionBtn' onMouseEnter={openInstructionPopover} onMouseLeave={delayCloseInstructionPopover}>More Score</div>
							</>
						</div>
					</div>
				</div>}

				{showInstructions && <div className='instructions' onMouseEnter={openInstructionPopover} onMouseLeave={delayCloseInstructionPopover}>
					<div className='popoverArrow'></div>
					<div className='popoverContent'>
						{ad?.instructions?.length > 0 && <>
							{ad.instructions.map((instruction: any, index: number) => {
								return (
									<div className='instruction' onClick={() => {
										!!instruction.link && window.open(`https://weekly.parami.io?redirect=${instruction.link}&nftId=${ad.nftId}&did=${ad?.userDid}&ad=${ad.adId}&tag=${instruction.tag}&score=${instruction.score}`);
									}}>
										<span className='instructionText'>{instruction.text}</span>
										<span className='instructionTag'>#{instruction.tag}</span>
										<span className='instructionScore'>+{instruction.score}</span>
									</div>
								);
							})}
						</>}
					</div>
				</div>}
			</div>
		</>
	)
};

export default Advertisement;