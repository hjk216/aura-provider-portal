"use client"

import Image from "next/image"
import Link from "next/link"

import arrow from "../../public/arrow.svg"

const image_hw = 32

export default function BackButton() {
  return (
    <div className="w-full">
      <Link href="/">
        <div className="hover:cursor-pointer w-fit">
          <Image src={arrow} alt="number" width={image_hw} height={image_hw} />
        </div>
      </Link>
    </div>
  )
}
