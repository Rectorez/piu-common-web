import {
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { callApi } from '../utils/apiUtils';

export default function ImageExtractionPage() {
  const [htmlContent, setHtmlContent] = useState('');
  const [imageURLs, setImageURLs] = useState([]);
  const [imageProperties, setImageProperties] = useState([]);

  const handleImageExtractionButtonClick = (event: any) => {
    console.log('Image Extraction Button Click', { event, htmlContent });

    const processHTMLIntoImages = async (htmlContent: any) => {
      const response = await callApi(
        'http://localhost:1000/web/getImagesFromHTML',
        'POST',
        htmlContent
      );
      console.log('API Response', { response });
      const formattedResponse = response.map((res: string) =>
        res.startsWith('/') ? 'https://ucs.piugame.com'.concat(res) : res
      );
      setImageURLs(formattedResponse);
      setImageProperties(
        formattedResponse.map((res: string) => {
          return { url: res, heightChange: 0, widthChange: 0 };
        })
      );
    };
    processHTMLIntoImages(htmlContent);
  };

  const handleImageMouseHover = (event: any) => {
    // console.log('Image Mouse Hover', { event });

    setImageProperties((prev: any) => {
      return prev.map((imageProp: any) => {
        if (imageProp.url != event.target.src) return { ...imageProp, heightChange: 0, widthChange: 0 };
        return {
          ...imageProp,
          heightChange: 180 * 0.05,
          widthChange: 320 * 0.05,
        };
      });
    });
  };

  const handleImageMouseLeave = (event: any) => {
    // console.log('Image Mouse Leave', { event });

    setImageProperties((prev: any) => {
      return prev.map((imageProp: any) => {
        return { ...imageProp, heightChange: 0, widthChange: 0 };
      });
    });
  };

  return (
    <div className="w-full h-full p-4 bg-white/60 rounded-[20px] flex flex-col">
      <div className="text-xl font-bold">HTML Content</div>
      <TextField
        className="text-white w-full h-auto"
        placeholder="Insert HTML Content..."
        multiline={true}
        value={htmlContent}
        onChange={(value) => setHtmlContent(value.target.value)}
        rows={10}
      />
      <br />
      <Button onClick={handleImageExtractionButtonClick} variant="contained">
        Extract Image Links
      </Button>
      <br />
      <div className="overflow-auto">
        {imageURLs && (
          <Table className="">
            <TableHead>
              <TableRow>
                {['Image', 'Name'].map((header) => (
                  <TableCell>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {imageURLs.map((imageURL) => {
                return (
                  <TableRow>
                    <TableCell>
                      <img
                        style={{
                          transition: 'all 0.2s',
                        }}
                        width={320 + imageProperties.filter((prop: any) => prop.url == imageURL)[0].widthChange}
                        // height={180 + imageProperties.filter((prop: any) => prop.url == imageURL)[0].heightChange}
                        alt={imageURL}
                        src={imageURL}
                        onMouseOver={handleImageMouseHover}
                        onMouseLeave={handleImageMouseLeave}
                      ></img>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
