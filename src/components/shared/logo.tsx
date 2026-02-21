import Image from 'next/image'
import Link from 'next/link'

function Logo() {
	return (
		<Link href={'/'} className='flex items-center gap-2'>
			<div className="w-10 h-10 md:w-12 md:h-12 relative">
				<Image
					src="/ac-logo.png"
					alt="logo"
					fill
					className="object-contain"
				/>
			</div>
			<h1 className='font-lora md:text-2xl font-bold'>Ungarov Advisor</h1>
		</Link>
	)
}

export default Logo