import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { join } from "path"
import { config } from './common/config'

import { AppModule } from './app.module'

async function start() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.enableCors()

  app.useGlobalPipes(new ValidationPipe({whitelist:true}))
  app.setGlobalPrefix('api')

  app.useStaticAssets(join(process.cwd(),"uploads"),{
    prefix:"/uploads/"
  })

  const options = new DocumentBuilder()
    .setTitle('Test')
    .setDescription('/api-swagger-json')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api-swagger', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  })

  await app.listen(config.serverPort, () => {
    console.log(`Server is running on http://localhost:${config.serverPort}`)
    console.log(
      `Swagger route: http://localhost:${config.serverPort}/api-swagger`
    )
  })
}

start()
