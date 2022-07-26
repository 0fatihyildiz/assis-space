import { default as Variables } from './Variables'
import { default as Images } from './Images'
import { Theme } from '@/Store/Theme'

export default function setCommons(theme: Partial<Theme>) {
  return {
    Images,
    ...Variables,
  }
}
