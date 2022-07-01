import React from "react";
import styled, { keyframes } from "styled-components/macro";

import { WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
          {variant === "on-sale" && <SaleFlag>Sale</SaleFlag>}
          {variant === "new-release" && <NewFlag>Just released!</NewFlag>}
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price
            style={{
              "--color":
                variant === "on-sale" ? "var(--color-gray-700)" : undefined,
              "--text-decoration":
                variant === "on-sale" ? "line-through" : undefined,
            }}
          >
            {formatPrice(price)}
          </Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
          {variant === "on-sale" ? (
            <SalePrice>{formatPrice(salePrice)}</SalePrice>
          ) : undefined}
        </Row>
      </Wrapper>
    </Link>
  );
};

const GradientKeyframes = keyframes`
  0%{
    background-position: 0% 0%;
  }
  50%{
    background-position: 100% 0%;
  }
  100%{
    background-position: 0% 0%;
  }
`;

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Flag = styled.div`
  position: absolute;
  top: 12px;
  right: -4px;
  background: red;
  height: 32px;
  line-height: 32px;
  padding: 0 10px;
  font-size: ${14 / 18}rem;
  font-weight: ${WEIGHTS.bold};
  color: var(--color-white);
  border-radius: 2px;
`;

const SaleFlag = styled(Flag)`
  background-color: var(--color-primary);
  background: linear-gradient(
    90deg,
    var(--color-primary),
    #a031c3,
    var(--color-primary)
  );
  background-size: 1200% 100%;
  background-repeat: no-repeat;
  animation: none 2000ms alternate forwards;
`;

const NewFlag = styled(Flag)`
  background: linear-gradient(
    90deg,
    var(--color-secondary),
    #4980da,
    var(--color-secondary)
  );
  background-size: 1200% 100%;
  background-repeat: no-repeat;
  animation: none 2000ms forwards;
`;

const Wrapper = styled.article`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  display: block;
  transition: transform 500ms;
  transform-origin: 50% 80%;
  will-change: transform;
`;

const ImageWrapper = styled.div`
  overflow: hidden;
  border-radius: 16px 16px 4px 4px;

  @media (prefers-reduced-motion: no-preference) {
    &:hover ${Image} {
      transform: scale(1.1);
      transition: transform 200ms;
    }
  }

  &:hover ${Flag} {
    animation-name: ${GradientKeyframes};
  }
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: var(--color-gray-900);
`;

const Price = styled.span`
  color: var(--color);
  text-decoration: var(--text-decoration);
`;

const ColorInfo = styled.p`
  color: var(--color-gray-700);
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: var(--color-primary);
`;

export default ShoeCard;
