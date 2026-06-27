/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import path from 'node:path'
import { type Request, type Response, type NextFunction } from 'express'

export function serveKeyFiles () {
  return ({ params }: Request, res: Response, next: NextFunction) => {
    const file = params.file
    if (!file.includes('/')) {
      const basePath = path.resolve('encryptionkeys/')
      const target = path.resolve(basePath, file)
      if (!target.startsWith(basePath + path.sep)) {
        res.status(403)
        return next(new Error('Invalid file path!'))
    }
    res.sendFile(target)
    } else {
      res.status(403)
      next(new Error('File names cannot contain forward slashes!'))
    }
  }
}
